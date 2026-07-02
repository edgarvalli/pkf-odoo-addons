import time
import base64
import random
import tempfile
from lxml import etree
from pathlib import Path
from zipfile import ZipFile
from datetime import timedelta
from odoo import fields, models
from odoo.exceptions import UserError
from .mailer_bak import Mailer, Attachment
from datetime import datetime, timezone
from odoo.modules.module import get_module_path
from odoo.tools.mimetypes import guess_mimetype
from ..types.mail_queue_types import (
    ContextDict,
    AttachmentDict,
)
from jinja2 import Template


class MailQueueService(models.AbstractModel):
    _name = "pkf.mail.queue.service"

    # =====================================================
    # Setters
    # =====================================================

    def _set_log(self, log):
        self.env["pkf.envios.logs"].create(
            {
                "uuid": log.get("uid"),
                "fecha": fields.Datetime.now(),
                "cliente": log.get("client", "System"),
                "rfc": log.get("rfc", "XAXX010101000"),
                "estatus": log.get("status", "ok"),
                "evento": log.get("event", ""),
            }
        )

    # =====================================================
    # Getters
    # =====================================================

    def _get_emails_from_sql(self, uuids=[]):

        dbname = self.env.company.ev_contpaqi_comercial_db.dbname

        if not dbname:
            raise UserError("Debe definir una base de datos en la empresa")

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
            INNER JOIN admDocumentos doc
                ON doc.CIDDOCUMENTO = fd.CIDDOCTO
            INNER JOIN admClientes c
                ON c.CIDCLIENTEPROVEEDOR = doc.CIDCLIENTEPROVEEDOR
            WHERE fd.CUUID IN ({placeholders});
        """

        with self.env["ev.tools.mssql"].connect(dbname) as db:
            return db.fetchall(sql, tuple(uuids))

    def _get_invoice_context(self, xml_bytes: bytes):

        if not xml_bytes:
            return {}

        ns = {
            "cfdi": "http://www.sat.gob.mx/cfd/4",
            "tfd": "http://www.sat.gob.mx/TimbreFiscalDigital",
        }

        try:

            root = etree.fromstring(xml_bytes)

            timbre = root.find(
                ".//tfd:TimbreFiscalDigital",
                namespaces=ns,
            )

            if timbre is None:
                return {}

            receptor = root.find(
                "cfdi:Receptor",
                namespaces=ns,
            )

            return {
                "uuid": timbre.get("UUID"),
                "rfc": receptor.get("Rfc") if receptor is not None else "",
                "razon_social": receptor.get("Nombre") if receptor is not None else "",
                "serie": root.get("Serie", ""),
                "folio": root.get("Folio", ""),
            }

        except Exception as e:
            print(f"Error parseando XML: {str(e)}")
            return {}

    # =====================================================
    # Utils
    # =====================================================

    def _render_body(self, ctx):

        template_path = (
            Path(get_module_path("pkf_clientes"))
            / "templates"
            / "email_queue_template.html"
        )

        if not template_path.exists():
            return "Se envían las facturas anexas"

        template_content = template_path.read_text(encoding="utf-8")

        total_attachments = len(ctx.get("attachment_ids", []))

        values = {
            "msg": (
                "le hacemos llegar sus facturas"
                if total_attachments > 1
                else "le hacemos llegar su factura"
            ),
            "client": ctx.get("razon_social") or "Cliente",
        }

        return self.render_html(template_content, values)

    def _map_context(self, attachments: dict[str, AttachmentDict]):

        ctx_list = {}

        for item in attachments.values():

            xml_ctx = item.get("context")
            if not xml_ctx or not xml_ctx.get("uuid"):
                continue

            uuid = xml_ctx["uuid"]

            if uuid not in ctx_list:

                ctx_list[uuid] = {
                    "idcliente": 0,
                    "uuid": uuid,
                    "rfc": xml_ctx.get("rfc", ""),
                    "razon_social": xml_ctx.get("razon_social", ""),
                    "serie": xml_ctx.get("serie", ""),
                    "folio": xml_ctx.get("folio", ""),
                    "subject": (
                        f"Factura disponible: "
                        f"{xml_ctx.get('serie', '')}"
                        f"{xml_ctx.get('folio', '')}"
                    ),
                    "emails": "",
                    "attachment_ids": [],
                }

            if "attachment_ids" in item:
                ctx_list[uuid]["attachment_ids"].extend(item["attachment_ids"])

        return ctx_list

    def _prepare_email_map(self, uuids):

        if not uuids:
            return {}

        email_data = self._get_emails_from_sql(uuids)

        return {row["uuid"]: row for row in email_data}

    def _build_mail_attachments(self, attachment_ids):

        attachments = []

        for attach in attachment_ids:

            mimetype = attach.mimetype or "application/octet-stream"

            parts = mimetype.split("/")

            maintype = parts[0]

            subtype = parts[1] if len(parts) > 1 else "octet-stream"

            attachments.append(
                Attachment(
                    data=base64.b64decode(attach.datas),
                    maintype=maintype,
                    subtype=subtype,
                    filename=attach.name,
                )
            )

        return attachments

    # =====================================================
    # Queue Builders
    # =====================================================

    def _process_single_context(
        self,
        ctx: ContextDict,
        email_map,
        send_to_client,
        email_cc=None,
    ):

        uuid = ctx.get("uuid")

        if send_to_client:

            sql_row = email_map.get(uuid)

            if not sql_row or not sql_row.get("emails"):

                self._set_log(
                    {
                        "uid": uuid,
                        "client": ctx.get("razon_social"),
                        "status": "error",
                        "event": ("No se encontraron correos " "en CONTPAQi"),
                    }
                )

                return False

            ctx["emails"] = sql_row["emails"]

            ctx["idcliente"] = sql_row.get(
                "idcliente",
                0,
            )

        else:

            ctx["emails"] = self.env.user.email or ""

        if not ctx["emails"]:

            self._set_log(
                {
                    "uid": uuid,
                    "client": ctx.get("razon_social"),
                    "status": "error",
                    "event": ("Destinatario final vacío"),
                }
            )

            return False

        self.env["pkf.email.queue"].create(
            {
                "subject": (
                    f"[INV] Factura CFDI 4.0 "
                    f"{ctx.get('serie', '')}"
                    f"{ctx.get('folio', '')}"
                ),
                "email_to": ctx["emails"],
                "email_cc": email_cc or False,
                "body_html": self._render_body(ctx),
                "state": "ready",
                "attachment_ids": [(6, 0, ctx["attachment_ids"])],
            }
        )

        return True

    # =====================================================
    # Builders
    # =====================================================

    def build_temp_path(self, zip_bytes):

        with tempfile.NamedTemporaryFile(delete=False) as f:

            f.write(zip_bytes)

            return Path(f.name)

    def build_attachments(self, zip_path: Path) -> dict[str, AttachmentDict]:

        with ZipFile(str(zip_path), "r") as z:

            grouped: dict[str, AttachmentDict] = {}

            for filename in z.namelist():

                if filename.endswith("/") or "__MACOSX" in filename:
                    continue

                path = Path(filename)

                ext = path.suffix.lower().lstrip(".")

                if ext not in ["xml", "pdf"]:
                    continue

                key = path.stem

                if key not in grouped:

                    grouped[key] = {
                        "attachment_ids": [],
                        "context": {},
                    }

                cursor = grouped[key]

                datas = z.read(filename)

                if ext == "xml":

                    ctx = self._get_invoice_context(datas)

                    cursor["context"] = ctx

                attach_id = self.env["ir.attachment"].create(
                    {
                        "type": "binary",
                        "datas": base64.b64encode(datas).decode("utf-8"),
                        "name": path.name,
                        "mimetype": guess_mimetype(datas),
                        "res_model": "pkf.email.queue",
                    }
                )

                if attach_id:
                    cursor["attachment_ids"].append(attach_id.id)
            return grouped

    # =====================================================
    # Queue Creator
    # =====================================================

    def process_and_create_queue(
        self,
        zip_bytes,
        send_to_client=False,
        email_cc=None,
    ):

        temp_path = self.build_temp_path(zip_bytes)

        try:

            attachments = self.build_attachments(temp_path)

            ctx_list = self._map_context(attachments)

            if not ctx_list:
                return

            email_map = (
                self._prepare_email_map(list(ctx_list.keys())) if send_to_client else {}
            )

            for ctx in ctx_list.values():

                self._process_single_context(
                    ctx,
                    email_map,
                    send_to_client,
                    email_cc,
                )

        finally:

            if temp_path and temp_path.exists():
                temp_path.unlink()

    # =====================================================
    # Queue Processor
    # =====================================================

    def render_html(self, template_content: str, values: dict):
        t = Template(template_content)
        return t.render(values)

    def process_queue(self):

        queue = self.env["pkf.email.queue"]

        limit_date = fields.Datetime.to_string(
            datetime.now(timezone.utc) - timedelta(minutes=30)
        )

        stuck = queue.search(
            [
                ("state", "=", "processing"),
                ("processing_date", "<", limit_date),
            ]
        )

        if stuck:
            stuck.write(
                {
                    "state": "ready",
                }
            )

        emails = queue.search(
            [("state", "=", "ready")],
            limit=5,
        )

        if not emails:
            return

        emails.write(
            {
                "state": "processing",
                "processing_date": fields.Datetime.now(),
            }
        )

        self.env.cr.commit()

        with Mailer() as mailer:

            for email in emails:

                try:

                    params = {
                        "subject": email.subject,
                        "email_to": email.email_to,
                        "email_cc": email.email_cc,
                        "email_bcc": email.email_bcc,
                        "html": email.body_html,
                        "attachments": (
                            self._build_mail_attachments(email.attachment_ids)
                        ),
                    }

                    mailer.build_email(**params).send()

                    email.write(
                        {
                            "state": "sent",
                            "date_sent": fields.Datetime.now(),
                            "error_notes": False,
                        }
                    )

                    self.env.cr.commit()

                    self._set_log(
                        {
                            "uid": email.id,
                            "client": email.email_to,
                            "status": "ok",
                            "event": ("Correo enviado " "correctamente."),
                        }
                    )

                    time.sleep(random.uniform(2, 5))

                except Exception as e:

                    email.write(
                        {
                            "state": "error",
                            "error_notes": str(e),
                        }
                    )

                    self.env.cr.commit()

                    self._set_log(
                        {
                            "uid": email.id,
                            "client": email.email_to,
                            "status": "error",
                            "event": (f"Fallo al enviar " f"correo: {str(e)}"),
                        }
                    )
