import uuid
from email.message import EmailMessage
from smtplib import SMTP_SSL
from odoo.models import BaseModel

from .attachment_builder import AttachmentBuilder


class Mailer:

    def __init__(self):
        self.SMTP_HOST = "mail.pkf.com.mx"
        self.SMTP_PORT = 465
        self.SMTP_USER = "facturacion.mty@pkf.com.mx"
        self.SMTP_PWD = "yHyL2gYvDzVv"

        self.smtp_cxn = None
        self.email_message = None
        self._bcc = []

    # =========================
    # Utils
    # =========================

    def _normalize_emails(self, value) -> list[str]:
        """
        Convierte:
        - "a@a.com,b@b.com"
        - ["a@a.com", "b@b.com"]
        - None

        a una lista limpia.
        """

        if not value:
            return []

        if isinstance(value, str):
            return [x.strip() for x in value.split(",") if x.strip()]

        if isinstance(value, (list, tuple, set)):
            return [str(x).strip() for x in value if str(x).strip()]

        return []

    # =========================
    # SMTP
    # =========================

    def connect(self):
        """Conecta solo cuando sea necesario"""

        if self.smtp_cxn:
            return

        try:
            self.smtp_cxn = SMTP_SSL(
                self.SMTP_HOST,
                self.SMTP_PORT,
            )

            self.smtp_cxn.login(
                self.SMTP_USER,
                self.SMTP_PWD,
            )

        except Exception as e:
            print(f"Error SMTP: {str(e)}")
            raise

    # =========================
    # Build
    # =========================

    def build_params(self, email: "BaseModel"):
        self._normalize_emails(email.email_to)
        self._normalize_emails(email.email_cc)
        self._normalize_emails(email.email_bcc)
        self._normalize_emails(email.email_reply_to)

    def build_email(self, email: "BaseModel"):

        self.build_params(email)

        if not email.email_to:
            raise ValueError("email_to is required")

        attachments = AttachmentBuilder.build_mail_attachments(email.attachment_ids)

        msg = EmailMessage()

        msg["To"] = ",".join(email.email_to)

        msg["From"] = f"Facturacion PKF Monterrey <{self.SMTP_USER}>"

        msg["Subject"] = email.subject

        msg["Message-ID"] = f"<{uuid.uuid4()}@pkf.com.mx>"

        if email.email_reply_to:
            msg["Reply-To"] = ",".join(email.email_reply_to)
        else:
            msg["Reply-To"] = self.SMTP_USER

        if email.email_cc:
            msg["Cc"] = ",".join(email.email_cc)

        # IMPORTANTE:
        # BCC NO debe ir en headers visibles
        self._bcc = email.email_bcc

        msg.set_content("Tu cliente de correo no soporta contenido HTML.")

        msg.add_alternative(email.body_html, subtype="html")

        if attachments:
            for attach in attachments:

                if not attach:
                    continue

                msg.add_attachment(
                    attach.data,
                    maintype=attach.maintype,
                    subtype=attach.subtype,
                    filename=attach.filename,
                )

        self.email_message = msg

        return self

    # =========================
    # Send
    # =========================

    def send(self):

        if not self.email_message:
            raise ValueError("No email_message built")

        recipients = []

        recipients.extend(self._normalize_emails(self.email_message.get("To")))

        recipients.extend(self._normalize_emails(self.email_message.get("Cc")))

        recipients.extend(self._bcc)

        self.smtp_cxn.send_message(
            self.email_message,
            to_addrs=recipients,
        )

        self.email_message = None
        self._bcc = []

    # =========================
    # Close
    # =========================

    def close(self):

        if not self.smtp_cxn:
            return

        try:
            self.smtp_cxn.quit()
        except:
            pass

        self.smtp_cxn = None

    # =========================
    # Context Manager
    # =========================

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self, exc_type, exc, tb):
        self.close()
