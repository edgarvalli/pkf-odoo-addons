from odoo import fields, models


class HrExpense(models.Model):
    _inherit = "hr.expense"

    pfk_timesheet_project_id = fields.Many2one(
        "pkf.timesheet.project", string="Control de Tiempo - Proyecto", store=True
    )

    def write(self, vals):
        result = super().write(vals)

        project = self.pfk_timesheet_project_id

        if project and result:
            # Forzamos el recálculo de los campos computados que dependen de las entradas
            project._compute_expenses()
            # Si total_amount_spend depende de total_hour_cost_amount, Odoo lo disparará,
            # pero puedes llamar a los métodos manualmente si no tienen store=True.
            project._compute_total_spend()
        return result

    def create(self, vals_list):
        result = super().create(vals_list)

        project = self.pfk_timesheet_project_id

        if project and result:
            # Forzamos el recálculo de los campos computados que dependen de las entradas
            project._compute_expenses()
            # Si total_amount_spend depende de total_hour_cost_amount, Odoo lo disparará,
            # pero puedes llamar a los métodos manualmente si no tienen store=True.
            project._compute_total_spend()

        return result
