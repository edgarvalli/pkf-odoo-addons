import time
import random
import logging
from odoo import models

_logger = logging.getLogger(__name__)


class ProcessEmailQueueService(models.AbstractModel):

    _name = "pkf.process.email.queue.service"
    _description = "PKF - Procesar Cola de Correos"

    def run(self):

        mails = self.env["mail.mail"].search(
            [("isbatch", "=", True), ("state", "=", "cancel")], limit=10
        )

        if not mails:
            _logger.info("No hay correos de estado de cuentas por procesar.")

        mails.update({"state": "outgoing"})

        for mail in mails:
            _logger.info(f"Enviando correo a {mail.email_to}")
            mail.send()
            time.sleep(random.uniform(2, 5))
