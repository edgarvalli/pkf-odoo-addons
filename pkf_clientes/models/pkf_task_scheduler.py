from odoo import models


class PKFTaskScheduler(models.AbstractModel):
    _name = "pkf.clientes.taskscheduler"
    _description = "Tareas Programadas PKF"

    def run_saldos_comercial(self):
        srv = self.env["pkf.estado.cuenta.service"]
        srv.enviar_estado_de_cuenta_bulk()
