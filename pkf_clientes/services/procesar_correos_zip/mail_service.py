import base64
from odoo.api import Environment
from .models import Attachment, Cliente
from .constants import MIME_TYPES


class MailService:
    def __init__(self, env: Environment):
        self.env = env

    def _get_mail_server_id(self):
        return self.env["ir.mail_server"].search(
            [("smtp_user", "=", "facturacion@pkfmty.com")], limit=1
        )

    def _create_attachments(self, attachments: list[Attachment]):
        AttachmentModel = self.env["ir.attachment"].sudo()

        attachment_ids = []

        for attachment in attachments:
            record = AttachmentModel.create(
                {
                    "name": attachment.name,
                    "type": "binary",
                    "datas": base64.b64encode(attachment.datas),
                    "mimetype": attachment.mimetype,
                    "res_model": "mail.mail",
                }
            )

            attachment_ids.append(record.id)

        return [(6, 0, attachment_ids)] if attachment_ids else []

    def schedule_emails(
        self,
        datas: dict[str, Cliente],
        email_cc: str,
        document_type: str,
        send_to_client=True,
    ):
        template_name = (
            "envio_pago_template"
            if document_type == "payment"
            else "envio_factura_template"
        )
        template = self.env.ref(f"pkf_clientes.{template_name}").sudo()

        mailid = self._get_mail_server_id()
        user_email = self.env.user.email

        for client in datas.values():
            email_values = {
                "email_from": "PKF Monterrey <no-reply@pkfmty.com>",
                "email_to": client.correos if send_to_client else user_email,
                "isbatch": True,
                "state": "cancel",
                "recipient_ids": [],
                "attachment_ids": self._create_attachments(client.attachments),
            }

            if send_to_client:
                email_values["email_cc"] = email_cc

            if mailid:
                email_values["mail_server_id"] = mailid.id

            subject = ", ".join(
                [a.stem for a in client.attachments if a.mimetype == MIME_TYPES[".pdf"]]
            )

            ctx = {
                "subject": subject,
                "documentos": client.attachments,
                "razon_social": client.razon_social,
            }

            template.with_context(ctx).send_mail(
                res_id=self.env.user.partner_id.id,
                force_send=False,
                email_values=email_values,
            )
