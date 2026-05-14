import time, random, logging, tempfile, threading, base64, uuid
from lxml import etree
from pathlib import Path
from zipfile import ZipFile
from datetime import datetime
from odoo.api import Environment
from dataclasses import dataclass
from typing import List, Iterable
from odoo.exceptions import UserError
from ..utils.odoo_tools import build_env
from ..types.envio_factura_types import (
    LogDic,
    FileDict,
    EmailDict,
    ContextDict,
    ResponseDict,
    FileAttachDict,
)

_logger = logging.getLogger(__name__)


def mail_worker(
    uid: str, env_dict: dict, zip_bytes: bytes, send_to_client=False, email_cc=None
):
    try:
        start = datetime.now()
        env = build_env(
            env_dict.get("dbname"),
            env_dict.get("uid"),
            env_dict.get("ctx"),
            env_dict.get("su", False),
        )

        srv = InvoiceSenderService(env, zip_bytes)

        for ctx in srv._build_context_list():
            try:
                srv.send(
                    ctx,
                    send_to_client=send_to_client,
                    email_cc=email_cc,
                )
                emails = ctx.get("emails")
                _logger.info(f"Correo programado para envio a {emails}")
                srv._set_log(
                    {
                        "client": ctx.get("razon_social"),
                        "event": f"Correo enviado a {emails}",
                        "rfc": ctx.get("rfc"),
                        "status": "ok",
                        "uid": uid,
                    }
                )
                env.cr.commit()
            except Exception as e:
                env.cr.rollback()
                _logger.exception("Error enviando correo")
                srv._set_log(
                    uid=uid,
                    cliente=ctx.get("razon_social"),
                    rfc=ctx.get("rfc"),
                    estatus="error",
                    evento=str(e),
                )
                env.cr.commit()

            time.sleep(random.uniform(0.1, 0.3))

    finally:
        env["pkf.envios.logs"].send_bitacora(uid, start, datetime.now())
        srv._unlink_temp()
        env.cr.close()


@dataclass
class InvoiceSenderService:
    env: Environment
    zip_bytes: bytes
    temppath: Path = None

    ###### Setters ######

    def _set_log(self, log: LogDic):
        self.env["pkf.envios.logs"].create(
            {
                "uuid": log.get("uid"),
                "fecha": datetime.now(),
                "cliente": log.get("client", "System"),
                "rfc": log.get("rfc", "XAXX010101000"),
                "estatus": log.get("status", "ok"),
                "evento": log.get("event", ""),
            }
        )

    ###### Getters ######

    def _get_env_dict(self):
        return {
            "dbname": self.env.cr.dbname,
            "uid": self.env.uid,
            "ctx": self.env.context.copy(),
            "su": True,
        }

    def _get_emails_from_sql(self, uuids=[]) -> List[EmailDict]:
        dbname = self.env.company.ev_contpaqi_comercial_db.dbname
        if not dbname:
            raise UserError("Debe de definir una base de datos en la em presa")

        if not uuids:
            return []

        placeholders = ",".join(["?"] * len(uuids))
        sql = f"""
            SELECT
                c.CIDCLIENTEPROVEEDOR idcliente,
                fd.CUUID uuid,
                CONCAT_WS(',',
                    NULLIF(TRIM(c.CEMAIL1), ''),
                    NULLIF(TRIM(c.CEMAIL2), ''),
                    NULLIF(TRIM(c.CEMAIL3), '')
                ) AS emails
            FROM admFoliosDigitales fd
            INNER JOIN admDocumentos doc ON doc.CIDDOCUMENTO = fd.CIDDOCTO
            INNER JOIN admClientes c ON c.CIDCLIENTEPROVEEDOR = doc.CIDCLIENTEPROVEEDOR
            WHERE fd.CUUID IN ({placeholders});
        """
        with self.env["ev.tools.mssql"].connect(dbname) as db:
            return db.fetchall(sql, tuple(uuids))

    def _get_temppath(self) -> Path:
        if not self.temppath:
            with tempfile.NamedTemporaryFile(delete=False) as f:
                f.write(self.zip_bytes)
                self.temppath = f.name
                return Path(f.name)

        return Path(self.temppath)

    def _get_invoice_context(self, attach: FileAttachDict) -> ContextDict:

        xml_bytes = attach.get("xml", {}).get("content")

        if not xml_bytes:
            return {}

        ns = {
            "cfdi": "http://www.sat.gob.mx/cfd/4",
            "tfd": "http://www.sat.gob.mx/TimbreFiscalDigital",
        }

        root = etree.fromstring(xml_bytes)
        complemento = root.find("cfdi:Complemento", namespaces=ns)

        timbre = None

        if complemento is not None:
            timbre = complemento.find("tfd:TimbreFiscalDigital", namespaces=ns)

        if timbre is None:
            return {}

        serie = root.get("Serie")
        folio = root.get("Folio")

        receptor = root.find("cfdi:Receptor", namespaces=ns)
        rfc_receptor = receptor.get("Rfc") if receptor is not None else None
        razon_social = receptor.get("Nombre") if receptor is not None else None
        tuuid = timbre.get("UUID")

        return {
            "uuid": tuuid,
            "rfc": rfc_receptor,
            "razon_social": razon_social,
            "serie": serie,
            "folio": folio,
            "files": list(attach.values()),
        }

    ###### Iterable ######

    def _iter_zip_files(self) -> Iterable[FileAttachDict]:
        with ZipFile(self._get_temppath(), "r") as z:
            grouped = {}
            for filename in z.namelist():
                if filename.endswith("/"):
                    continue

                path = Path(filename)
                ext = path.suffix.lower().strip()[1:]

                if ext not in ["xml", "pdf"]:
                    continue

                key = path.stem

                if key not in grouped:
                    grouped[key] = {}

                grouped[key][ext] = {
                    "filename": path.name,
                    "content": z.read(filename),
                }

                if "xml" in grouped[key] and "pdf" in grouped[key]:
                    yield grouped.pop(key)

    ###### Validation ######

    def _is_batch(self, limit=10) -> bool:
        with ZipFile(self._get_temppath(), "r") as z:
            for i, _ in enumerate(z.namelist()):
                if i > limit:
                    return True
            return False

    ###### Utils ######

    def _attach_files(self, files: List[FileAttachDict]) -> List[int]:
        attach = self.env["ir.attachment"]

        ids = []

        for f in files:
            if not f.get("content"):
                continue

            rec = attach.create(
                {
                    "name": f.get("filename"),
                    "datas": base64.encodebytes(f.get("content")).decode(),
                    "type": "binary",
                    "mimetype": (
                        "application/pdf"
                        if f.get("filename", "").endswith(".pdf")
                        else "application/xml"
                    ),
                }
            )

            ids.append(rec.id)

        return ids

    def _map_emails_context(
        self, uuids: List[str], ctx_list: List[ContextDict]
    ) -> List[ContextDict]:
        emails = self._get_emails_from_sql(uuids)
        emails_dict = {e.get("uuid"): e for e in emails}

        new_ctx_list = []

        for ctx in ctx_list:
            _ctx = ctx.copy()
            key = ctx.get("uuid")

            if not key:
                continue

            email_dict: EmailDict = emails_dict.get(key)

            if not email_dict:
                continue

            _ctx["emails"] = email_dict.get("emails")
            _ctx["idcliente"] = email_dict.get("idcliente")

            new_ctx_list.append(_ctx)

        return new_ctx_list

    def _normalize_emails(self, emails: str) -> str:
        if not emails:
            return ""

        clean = []

        for email in emails.split(","):

            email = email.strip().lower()

            if "@" not in email:
                continue

            clean.append(email)

        return ",".join(sorted(set(clean)))

    ###### Unlink ######

    def _unlink_temp(self):
        if not self.temppath:
            return

        path = Path(self.temppath)

        if path.exists():
            path.unlink()

        self.temppath = None

    ###### Builder ######

    def _build_context_list(self) -> List[ContextDict]:

        file_list: dict[str, List[FileDict]] = {}
        ctx_list: List[ContextDict] = []

        for file in self._iter_zip_files():
            ctx = self._get_invoice_context(file)
            inv_uuid = ctx.get("uuid")

            if not inv_uuid in file_list:
                file_list[inv_uuid] = []

            file_list[inv_uuid].append(file.get("pdf"))
            file_list[inv_uuid].append(file.get("xml"))

            ctx_list.append(ctx)

        ctx_list = self._map_emails_context(file_list.keys(), ctx_list)
        ctx_list = [
            {**ctx, "files": file_list.get(ctx.get("uuid"), [])} for ctx in ctx_list
        ]

        return ctx_list

    ###### Public Functions ######

    def send(self, ctx: ContextDict, **kwargs):
        template = self.env.ref("pkf_clientes.envio_factura_template").sudo()

        files = ctx.get("files") or []

        send_to_client = kwargs.get("send_to_client")
        user_email = self.env.user.email
        attachment_ids = self._attach_files(files)

        email_values = {
            "email_from": "Facturación PKF Monterrey <no-reply@pkfmty.com>",
            "attachment_ids": [(6, 0, attachment_ids)],
        }

        emails = ctx.get("emails") if send_to_client else None

        emails = list(
            {
                e.strip().lower()
                for e in (emails or "").split(",")
                if e.strip() and "@" in e
            }
        )

        emails = ",".join(emails)

        email_values["email_to"] = emails or user_email

        if send_to_client:
            email_cc = kwargs.get("email_cc")
            if email_cc:
                email_cc = self._normalize_emails(
                    ",".join(filter(None, [email_cc, user_email]))
                )
            else:
                email_cc = user_email

            email_values["email_cc"] = email_cc

        template.with_context(ctx).send_mail(
            res_id=self.env.user.id,
            force_send=kwargs.get("force_send", False),
            email_values=email_values,
        )

    def sendasync(self, uid: str, send_to_client=False, email_cc: str = None):
        args = (uid, self._get_env_dict(), self.zip_bytes, send_to_client, email_cc)
        t = threading.Thread(target=mail_worker, args=args, name=f"pkf-mailer-{uid}")
        t.start()

        return {"type": "job", "uid": uid}

    def sendall(self, send_to_client=False, email_cc: str = None) -> ResponseDict:
        ctx_list = self._build_context_list()
        uid = str(uuid.uuid4())

        if self._is_batch():
            self.sendasync(uid, send_to_client, email_cc)
            return {"type": "job", "uid": uid}

        for ctx in ctx_list:
            self.send(
                ctx, send_to_client=send_to_client, email_cc=email_cc, force_send=True
            )
            emails = ctx.get("emails")
            self._set_log(
                {
                    "client": ctx.get("razon_social"),
                    "event": f"Correo enviado a {emails}",
                    "rfc": ctx.get("rfc"),
                    "status": "ok",
                    "uid": uid,
                }
            )
            time.sleep(random.uniform(0.1, 0.3))
        self._unlink_temp()
        return {"type": "instant", "uid": uid}
