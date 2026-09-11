from odoo import models
from ..services import EstadoCuentaService


class PKFTaskScheduler(models.AbstractModel):
    _name = "pkf.clientes.taskscheduler"
    _description = "Tareas Programadas PKF"

    def run_saldos_comercial(self):
        srv = EstadoCuentaService(self.sudo().env)
        srv.enviar_estado_de_cuenta()
