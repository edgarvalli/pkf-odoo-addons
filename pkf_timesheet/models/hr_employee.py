from odoo import fields, models


class HrEmployee(models.Model):
    _inherit = "hr.employee"

    timesheet_cost = fields.Float(
        string="Costo por Hora",
        default=0,
        digits=(16, 2),  # Opcional: para asegurar precisión decimal
        tracking=True,  # Para que los cambios de sueldo queden en el log
        help="Costo operativo de la hora de trabajo para este empleado.",
        store=True,
    )
