from odoo import fields, models


class PKFTimeSheetPhase(models.Model):
    _name = "pkf.timesheet.project.phase"
    _description = "PKF - Rubro de las Actividades"
    _rec_name = "name"
    _order = "order"

    code = fields.Char("Codigo", index=True, compute="_compute_code")
    name = fields.Char("Rubro", index=True)
    order = fields.Integer("Orden", default=0)
    active = fields.Boolean("Activo", default=True)
    task_ids = fields.One2many("pkf.timesheet.project.task", "phase_id", string="Tasks")

    def _compute_code(self):
        for rec in self:
            if rec.id:
                rec.code = f"PHA{str(rec.id).zfill(5)}"
            else:
                rec.code = "0".zfill(5)
