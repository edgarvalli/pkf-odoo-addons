from odoo.models import Model
from odoo.fields import Char


class HrEmployee(Model):
    _inherit = "hr.employee"

    segmento_pkf = Char("Segmento")
