import uuid
from odoo.models import BaseModel
from odoo.exceptions import UserError
from email.message import EmailMessage

from .models import Attachment, MailData


class MailBuilder:

    @staticmethod
    def build(email: MailData, sender: str):
        if not email.to:
            raise UserError("email_to is required")

        msg = EmailMessage()

        msg["To"] = ",".join(email.to)

        msg["From"] = f"Facturacion PKF Monterrey <{sender}>"

        msg["Subject"] = email.subject

        msg["Message-ID"] = f"<{uuid.uuid4()}@pkf.com.mx>"

        if email.reply_to:
            msg["Reply-To"] = ",".join(email.reply_to)
        else:
            msg["Reply-To"] = sender

        if email.cc:
            msg["Cc"] = ",".join(email.cc)

        msg.set_content("Tu cliente de correo no soporta contenido HTML.")

        msg.add_alternative(email.body_html, subtype="html")

        MailBuilder.build_attachments(msg, email.attachments)
        return msg

    @staticmethod
    def build_attachments(
        msg: EmailMessage, attachments: list[Attachment] | None = None
    ):

        attachments = attachments or []

        for attach in attachments:
            if not attach:
                continue

            msg.add_attachment(
                attach.data,
                maintype=attach.maintype,
                subtype=attach.subtype,
                filename=attach.filename,
            )
