from dataclasses import dataclass
from email.message import EmailMessage
from smtplib import SMTP_SSL
from typing import Optional
import uuid


@dataclass
class Attachment:
    data: bytes
    maintype: str
    subtype: str
    filename: str


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
    # Build Email
    # =========================

    def build_email(
        self,
        email_to,
        subject: str,
        html: str,
        email_reply_to=None,
        email_cc=None,
        email_bcc=None,
        attachments: Optional[list[Attachment]] = None,
    ):

        email_to = self._normalize_emails(email_to)
        email_cc = self._normalize_emails(email_cc)
        email_bcc = self._normalize_emails(email_bcc)
        email_reply_to = self._normalize_emails(email_reply_to)

        if not email_to:
            raise ValueError("email_to is required")

        msg = EmailMessage()

        msg["To"] = ",".join(email_to)

        msg["From"] = f"Facturacion PKF Monterrey <{self.SMTP_USER}>"

        msg["Subject"] = subject

        msg["Message-ID"] = f"<{uuid.uuid4()}@pkf.com.mx>"

        if email_reply_to:
            msg["Reply-To"] = ",".join(email_reply_to)
        else:
            msg["Reply-To"] = self.SMTP_USER

        if email_cc:
            msg["Cc"] = ",".join(email_cc)

        # IMPORTANTE:
        # BCC NO debe ir en headers visibles
        self._bcc = email_bcc

        msg.set_content("Tu cliente de correo no soporta contenido HTML.")

        msg.add_alternative(
            html,
            subtype="html",
        )

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
