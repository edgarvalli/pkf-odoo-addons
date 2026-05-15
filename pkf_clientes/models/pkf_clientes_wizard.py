import base64
from odoo import models, fields
from odoo.exceptions import UserError
from ..services import MailQueueService


class PKFClientesWizard(models.TransientModel):
    _name = "pkf.clientes.wizard"
    _description = "PKF Clientes Wizard - Subir Facturas"

    file = fields.Binary("Facturas", required=True)
    filename = fields.Char()
    email_cc = fields.Text(string="CC", help="Correos separados por coma")
    send_to_client = fields.Boolean("Enviar al cliente")

    def action_run(self):
        self.ensure_one()

        if not self.file:
            raise UserError("Debe subir un archivo ZIP")

        file_content = base64.b64decode(self.file)

        mailer = MailQueueService(self.env)
        mailer.process_and_create_queue(
            file_content, self.send_to_client, self.email_cc
        )

        return {
            "type": "ir.actions.client",
            "tag": "display_notification",
            "params": {
                "title": "Proceso completado",
                "message": "Se programo los correos para envio",
                "type": "success",
                "sticky": False,
                "next": {"type": "ir.actions.act_window_close"},
            },
        }
