from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    contpaqi_api_url = fields.Char("Contpaqi Api Url")
