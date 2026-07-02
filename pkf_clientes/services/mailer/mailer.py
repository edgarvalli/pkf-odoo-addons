from smtplib import SMTP_SSL
from .models import MailData
from .mail_builder import MailBuilder


class Mailer:
    def __init__(self):
        self.SMTP_HOST = "mail.pkf.com.mx"
        self.SMTP_PORT = 465
        self.SMTP_USER = "facturacion.mty@pkf.com.mx"
        self.SMTP_PWD = "yHyL2gYvDzVv"

        self.smtp_cxn = None

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

    def send(self, email: MailData):

        if self.smtp_cxn is None:
            raise RuntimeError("No existe una conexión SMTP.")

        if not email.to:
            raise ValueError("El correo debe tener al menos un destinatario.")

        message = MailBuilder.build(
            email=email,
            sender=self.SMTP_USER,
        )

        recipients = [
            *email.to,
            *email.cc,
            *email.bcc,
        ]

        self.smtp_cxn.send_message(
            message,
            to_addrs=recipients,
        )

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
