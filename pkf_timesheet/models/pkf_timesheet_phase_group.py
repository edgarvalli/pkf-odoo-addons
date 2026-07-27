from odoo import fields, models


class PKFTimesheetPhaseGroup(models.Model):

    _name = "pkf.timesheet.phase.group"
    _description = "PKF - Grupos de Rubros"

    name = fields.Char("Nombre del Group")
    is_all = fields.Boolean("Incluir Todos", default=False)
    phase_ids = fields.Many2many(
        "pkf.timesheet.project.phase",
        string="Rubros",
        default=lambda self: self.env.ref("pkf_timesheet.pkf_phase_others"),
    )
