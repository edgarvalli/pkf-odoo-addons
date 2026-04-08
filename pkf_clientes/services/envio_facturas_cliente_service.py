import logging
from lxml import etree
from pathlib import Path
from zipfile import ZipFile
from typing import List
import io, base64, uuid
from datetime import datetime
from odoo.exceptions import UserError
from ..utils.tools import get_img_b64, next_5_min
from werkzeug.datastructures import FileStorage
from ..types.envio_factura_types import (
    EmailDict,
    ContextDict,
    EnvioResponse,
    FileAttachDict,
)
from odoo.orm.environments import Environment
from dataclasses import dataclass

_logger = logging.getLogger(__name__)


@dataclass
class EnvioFacturasClienteService:

    env: Environment

    def _set_log(self, **kwargs):
        self.env["pkf.envios.logs"].create(
            {
                "uuid": kwargs.get("uid"),
                "fecha": datetime.now(),
                "cliente": kwargs.get("cliente", "System"),
                "rfc": kwargs.get("rfc", "XAXX010101000"),
                "estatus": kwargs.get("estatus", "ok"),
                "evento": kwargs.get("evento", ""),
            }
        )

    def _get_files_from_bytes(self, zip_bytes: bytes) -> List[FileAttachDict]:
        files = {}

        with ZipFile(io.BytesIO(zip_bytes), "r") as z:
            for filename in z.namelist():

                if filename.endswith("/"):
                    continue

                path = Path(filename)
                ext = path.suffix.lower().strip()[1:]

                if ext not in ["xml", "pdf"]:
                    continue

                key = path.stem

                if key not in files:
                    files[key] = {}

                files[key][ext] = {
                    "filename": path.name,
                    "content": z.read(filename),
                }

        return list(files.values())

    def _get_metadata_factura(self, attach: FileAttachDict) -> ContextDict:

        xml_bytes = attach.get("xml", {})["content"]

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

    def _get_emails_from_sql(self, uuids=[]) -> List[EmailDict]:
        dbname = self.env.company.ev_contpaqi_comercial_db.dbname
        if not dbname:
            raise UserError("Debe de definir una base de datos en la em presa")

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

    def _map_emails_context(self, ctx_list: List[ContextDict], emails: List[EmailDict]):

        _ctx_map = {ctx["uuid"]: ctx for ctx in ctx_list}

        _ctxs = []
        for email in emails:

            _ctx = _ctx_map.get(email["uuid"])
            if not _ctx:
                continue

            _ctx["emails"] = email["emails"]
            _ctx["idcliente"] = email["idcliente"]
            _ctxs.append(_ctx)

        return _ctxs

    def _map_files(self, ctx_list: List[ContextDict]):
        _ctx_list_new = {}

        for ctx in ctx_list:
            key = ctx.get("idcliente")
            if not key:
                continue

            files = ctx.get("files", [])

            serie = ctx.get("serie") or ""
            folio = ctx.get("folio") or ""
            subject = f"{serie} {folio}".strip()

            if key not in _ctx_list_new:
                _ctx_list_new[key] = {
                    **ctx,
                    "subject": [subject] if subject else [],
                    "files": list(files),
                }
            else:
                _ctx_list_new[key]["subject"].append(subject)
                _ctx_list_new[key]["files"].extend(files)

        return [
            {**c, "subject": ",".join(c.get("subject"))} for c in _ctx_list_new.values()
        ]

    def _context_makeup(self, attach: FileAttachDict) -> ContextDict:
        ctx = self._get_metadata_factura(attach)
        ctx["banner"] = get_img_b64("banner.png")
        return ctx

    def _build_context_from_bytes(self, zip_bytes: bytes) -> List[ContextDict]:
        attachments = self._get_files_from_bytes(zip_bytes)
        data = [self._context_makeup(a) for a in attachments]
        uuids = [raw.get("uuid") for raw in data]
        emails = self._get_emails_from_sql(uuids)
        ctx_list = self._map_emails_context(data, emails)
        return self._map_files(ctx_list)

    def _create_job(self, attachment_id: int, uid: str, send_to_client: bool):
        job_id = self.env["pkf.tools"].create_job(
            uid=uid,
            model_id=self.env["ir.model"]._get("pkf.clientes.taskscheduler").id,
            state="code",
            code=f"model.run_envios_facturas({attachment_id}, '{uid}', {send_to_client})",
            nextcall=next_5_min(),
            interval_number=1,
            interval_type="minutes",
            active=True,
        )

        return job_id.id

    def _job_enviar(self, attachment_id: int, uid: str, send_to_client=False):
        attachment = self.env["ir.attachment"].browse(attachment_id)

        zip_bytes = base64.b64decode(attachment.datas)

        start = datetime.now()
        clientes = self._build_context_from_bytes(zip_bytes)

        for ctx in clientes:
            cliente = ctx.get("razon_social") or "System"

            self.enviar(ctx, send_to_client=send_to_client)

            self._set_log(
                uid=uid,
                cliente=cliente,
                rfc=ctx.get("rfc"),
                evento=f"Correo programado para {cliente}",
            )

        self.env["pkf.envios.logs"].send_bitacora(uid, start, datetime.now())

        # limpiar
        _logger.info("Eliminando el archivo zip de las facturas")
        attachment.unlink()

    def _count_facturas(self, zip_bytes: bytes) -> int:
        facturas = set()

        with ZipFile(io.BytesIO(zip_bytes), "r") as z:
            for name in z.namelist():
                if name.endswith("/"):
                    continue

                path = Path(name)
                if path.suffix.lower() in [".xml", ".pdf"]:
                    facturas.add(path.stem)

        return len(facturas)

    def _attach_files(self, files: List[FileAttachDict]) -> List[int]:
        attach = self.env["ir.attachment"]

        ids = []

        for f in files:
            if not f.get("content"):
                continue

            rec = attach.create(
                {
                    "name": f.get("filename"),
                    "datas": base64.b64encode(f.get("content")),
                    "type": "binary",
                }
            )

            ids.append(rec.id)

        return ids

    def enviar(self, ctx: ContextDict, **kwargs):
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

        emails = ",".join(
            e.strip() for e in (emails or "").split(",") if e.strip() and "@" in e
        )

        email_values["email_to"] = emails or user_email

        if send_to_client:
            email_values["email_cc"] = user_email

        template.with_context(ctx).send_mail(
            res_id=self.env.user.partner_id.id,
            force_send=kwargs.get("force_send", False),
            email_values=email_values,
        )

    def enviar_todos_http(
        self, file: FileStorage, send_to_client=False
    ) -> EnvioResponse:
        return self.enviar_todos(file.read(), send_to_client)

    def enviar_todos(self, zip_bytes: bytes, send_to_client=False) -> EnvioResponse:
        uid = str(uuid.uuid4())

        total = self._count_facturas(zip_bytes)

        if total > 10:
            attachment = self.env["ir.attachment"].create(
                {
                    "name": f"zip_{uid}.zip",
                    "datas": base64.b64encode(zip_bytes),
                    "type": "binary",
                }
            )

            self._create_job(attachment.id, uid, send_to_client)
            return {"type": "job", "uid": uid}

        for ctx in self._build_context_from_bytes(zip_bytes):
            self.enviar(ctx, send_to_client=send_to_client, force_send=True)

        return {"type": "instant", "uid": uid}
