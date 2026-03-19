from odoo import fields, models


class HrEmployeeMixin(models.Model):
    """Extensión de res.company para ligar Odoo a Nominas Contpaqi"""

    _inherit = "hr.employee"

    ev_employee_code = fields.Char("No. Empleado")
