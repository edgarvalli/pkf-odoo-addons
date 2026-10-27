import time
import random
import logging
from odoo import models

_logger = logging.getLogger(__name__)


class ProcessEmailQueue(models.AbstractModel):

    _name = "pkf.process.email.queue"
    _description = "PKF - Procesar Cola de Correos"

    def run(self):

        mails = self.env["mail.mail"].search(
            [("isbatch", "=", True), ("state", "=", "cancel")], limit=10
        )

        if not mails:
            _logger.info("No hay correos de estado de cuentas por procesar.")

        mails.update({"state": "outgoing"})

        for mail in mails:
            try:
                _logger.info(f"Enviando correo a {mail.email_to}")
                mail.send()
            except:
                _logger.error(f"Ocurrio un error al enviar el correo a {mail.email_to}")
            finally:
                time.sleep(random.uniform(2, 5))
