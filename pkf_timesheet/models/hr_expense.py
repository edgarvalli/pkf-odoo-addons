from odoo import fields, models


class HrExpense(models.Model):
    _inherit = "hr.expense"

    pfk_timesheet_project_id = fields.Many2one(
        "pkf.timesheet.project", string="Control de Tiempo - Proyecto", store=True
    )
