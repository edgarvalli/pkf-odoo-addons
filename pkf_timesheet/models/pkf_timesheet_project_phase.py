from odoo import fields, models


class PKFTimeSheetPhase(models.Model):
    _name = "pkf.timesheet.project.phase"
    _description = "PKF - Rubro de las Actividades"
    _rec_name = "name"
    _order = "order"

    code = fields.Char("Codigo", index=True, compute="_compute_code", store=True)
    name = fields.Char("Rubro", index=True)
    order = fields.Integer("Orden", default=0)
    active = fields.Boolean("Activo", default=True)
    include_in_cost = fields.Boolean("Incluir en Costo", default=True)
    task_ids = fields.One2many("pkf.timesheet.project.task", "phase_id", string="Tasks")

    def _compute_code(self):
        for rec in self:
            if rec.id:
                rec.code = f"PHA{str(rec.id).zfill(5)}"
            else:
                rec.code = "0".zfill(5)

    def write(self, vals):
        result = super().write(vals)

        if "include_in_cost" in vals:
            for rec in self:
                rec.task_ids.write({"include_in_cost": vals["include_in_cost"]})

        if not self.code:
            self._compute_code()

        return result

    def refresh_codes(self):
        records = self.search([])
        for rec in records:
            if not rec.code:
                rec._compute_code()
