from odoo import models, fields


class ResPartner(models.Model):
    _inherit = "res.partner"
    pkf_partner_group = fields.Many2one("pkf.partner.group", string="Grupo PKF")
