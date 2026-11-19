from odoo import models as odoo_models
from .metadata import MetadataService


class DashboardService(odoo_models.AbstractModel):
    _name = "pkf.timesheet.dashboard.service"
    _description = "PKF - TS Dashboard Service"

    def get_metadata(self):
        srv = MetadataService(self.sudo().env)
        return srv.get().to_dict()
