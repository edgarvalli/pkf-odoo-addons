from odoo import models, fields
from ..services import TemplateProjectService


class PKFTimesheetProjectImport(models.Model):
    _name = "pkf.timesheet.project.import"
    _description = "PKF Timesheet Project Import"

    file = fields.Binary(string="Template")

    def import_template(self):
        if not self.file:
            return

        srv = TemplateProjectService(self.sudo().env)
        return srv.import_template(self.file)
