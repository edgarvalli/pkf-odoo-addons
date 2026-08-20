import base64
from odoo import models, fields
from odoo.exceptions import UserError
from ..services import ProcesarZipContpaqi

# from ..services import MailQueueService


class PKFClientesWizard(models.TransientModel):
    _name = "pkf.clientes.wizard"
    _description = "PKF Clientes Wizard - Subir Facturas"

    file = fields.Binary("Facturas", required=True)
    filename = fields.Char()
    email_cc = fields.Text(string="CC", help="Correos separados por coma")
    send_to_client = fields.Boolean("Enviar al cliente")

    def run(self):
        return

    def action_run(self):
        self.ensure_one()

        if not self.file:
            raise UserError("Debe subir un archivo ZIP")

        file_content = base64.b64decode(self.file)

        email_cc = self.email_cc.split(",") if self.email_cc else []
        email_cc.append(self.env.user.email)
        email_cc = ",".join(email.strip() for email in email_cc)

        srv = ProcesarZipContpaqi(self.sudo().env)
        srv.procesar(file_content, email_cc)

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
