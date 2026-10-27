import time
import random
import logging
from odoo import models

_logger = logging.getLogger(__name__)


class ProcessEmailQueue(models.AbstractModel):
    _name = "pkf.process.email.queue"
    _description = "PKF - Procesar Cola de Correos"

    def _get_mails(self) -> models.Model:
        return self.env["mail.mail"].search(
            [
                ("isbatch", "=", True),
                ("state", "=", "cancel"),
            ],
            limit=10,
            order="id",
        )

    def _get_mail_servers(self) -> models.Model:
        return self.env["ir.mail_server"].search(
            [
                (
                    "smtp_user",
                    "in",
                    [
                        "facturacion@pkfmty.com",
                        "facturacion.mty@pkf.com.mx",
                    ],
                ),
                ("active", "=", True),
            ],
            order="sequence, id",
        )

    def _process_mail(self, mail: models.Model):
        mail_id = mail.id
        email_to = mail.email_to
        try:
            _logger.info("Enviando correo ID %s a %s", mail_id, email_to)

            mail.send()

            if self.env["mail.mail"].browse(mail_id).exists():
                mail.invalidate_recordset(["state"])
                state = mail.state
            else:
                state = "eliminado tras el envío"

            _logger.info("Correo ID %s: estado %s", mail_id, state)

        except Exception:
            _logger.exception(
                "Ocurrió un error al enviar el correo ID %s a %s",
                mail.id,
                mail.email_to,
            )

        finally:
            time.sleep(random.uniform(2, 5))

    def run(self):
        mails = self._get_mails()
        mail_servers = self._get_mail_servers()

        if not mails:
            _logger.info("No hay correos de estado de cuentas por procesar.")
            return

        if not mail_servers:
            _logger.error("No hay servidores SMTP disponibles.")
            return

        for index, mail in enumerate(mails):
            server = mail_servers[index % len(mail_servers)]

            # mail_server_id pertenece a mail.message.
            if mail.mail_message_id:
                mail.mail_message_id.write({"mail_server_id": server.id})

            mail.write({"state": "outgoing"})

            _logger.info(
                "Correo ID %s asignado al servidor %s (ID %s)",
                mail.id,
                server.name,
                server.id,
            )

            self._process_mail(mail)
