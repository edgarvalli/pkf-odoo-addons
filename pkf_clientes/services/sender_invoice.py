import smtplib
from time import sleep
from pathlib import Path
from email.message import EmailMessage
from odoo import api

from odoo.orm.registry import Registry


class senderinvoice:

    def __init__(self, dbname: str, uid: int, context: dict):
        self.dbaname = dbname
        self.uid = uid
        self.context = context
        self.email_from = "facturacion.mty@pkf.com.mx"
        self.email_password = "yHyL2gYvDzVv"
        self.smtp_host = "mail.pkf.com.mx"
        self.smtp_port = 465

        self._run()

    def send_email(
        self,
        subject: str,
        email_to: list[str],
        email_cc: list[str] | None = None,
    ):
        msg = EmailMessage()

        msg.set_content(self.render_template(), subtype="html")

        msg["Subject"] = subject
        msg["From"] = f"Facturación PKF Monterrey <{self.email_from}>"
        msg["To"] = ", ".join(email_to)

        if email_cc:
            msg["Cc"] = ", ".join(email_cc)

        print(msg)

        try:
            with smtplib.SMTP_SSL(
                self.smtp_host,
                self.smtp_port,
            ) as smtp:

                smtp.login(
                    self.email_from,
                    self.email_password,
                )

                smtp.send_message(msg)

                print("Correo enviado.")

        except Exception as e:
            print(f"Ocurrió un error: {e}")

    def render_template(self, template_dir: str = None, **args):
        if template_dir:
            template_dir = Path(template_dir)
        else:
            template_dir = (
                Path(__file__).parent.parent / "templates/invoice_email_template.html"
            )

        if not template_dir.exists():
            raise ValueError("No se encontro el template.")

        with open(str(template_dir), "r", encoding="utf-8") as t:
            template = t.read()

            return template.format(**args)

    def build_context(self):
        registry = Registry(self.dbaname)

        with registry.cursor() as cr:
            self.env = api.Environment(cr, self.uid, self.context)

    def _run(self):
        print("Waiting to send email.")
        self.build_context()
        sleep(1)
        print("workss")
        # self.send_email("[INV] Prueba envio", email_to=["evalli@pkf.com.mx"])
