from odoo import fields, models


class PKFTimesheetContract(models.Model):
    _name = "pkf.timesheet.contract"
    _description = "PKF - Timesheet Contract"
    _rec_name = "contract_number"

    contract_number = fields.Char("Numero de contrato", required=True)
    contract_name = fields.Char("Nombre de contrato")
    description = fields.Text("Descripción")
