import base64
from io import BytesIO
from odoo import models, fields
from odoo.exceptions import UserError
from ..services import EnvioFacturasClienteService


class PKFClientesWizard(models.TransientModel):
    _name = "pkf.clientes.wizard"
    _description = "PKF Clientes Wizard - Subir Facturas"

    file = fields.Binary("Facturas", required=True)
    filename = fields.Char()
    send_to_client = fields.Boolean("Enviar al cliente")

    def action_run(self):
        self.ensure_one()

        if not self.file:
            raise UserError("Debe subir un archivo ZIP")

        file_content = base64.b64decode(self.file)

        envio_srv = EnvioFacturasClienteService(self.env)

        result = envio_srv.enviar_todos(file_content, self.send_to_client)

        uid = result.get("uid")

        message = (
            "Se enviaron los correos correctamente"
            if result.get("type") == "instant"
            else f"Correos programados. UUID {uid}"
        )

        return {
            "type": "ir.actions.client",
            "tag": "display_notification",
            "params": {
                "title": "Proceso completado",
                "message": message,
                "type": "success",
                "sticky": False,
            },
        }
