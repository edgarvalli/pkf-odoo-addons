from odoo import fields, models


class PKFTimeSheetTask(models.Model):
    _name = "pkf.timesheet.project.task"
    _description = "PKF - Tareas"
    _order = "order"

    name = fields.Char("Tarea", required=True)
    code = fields.Char("Code", index=True, compute="_compute_code", store=True)
    order = fields.Integer("Orden", default=0)
    note = fields.Text()
    estimated_hours = fields.Float()
    include_in_cost = fields.Boolean("Incluir en Costo", default=True)
    phase_id = fields.Many2one("pkf.timesheet.project.phase", store=True)

    def _compute_code(self):
        for rec in self:
            if rec.id:
                rec.code = f"TASK{str(rec.id).zfill(5)}"
            else:
                rec.code = "0".zfill(5)
