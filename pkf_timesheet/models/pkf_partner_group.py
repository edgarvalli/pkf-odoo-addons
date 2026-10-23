from odoo import models, fields


class PKFPartnerGroup(models.Model):
    _name = "pkf.partner.group"
    _description = "PKF - Grupo de Cliente"

    code = fields.Char("Codigo", index=True)
    name = fields.Char("Grupo Comercial")
    active = fields.Boolean("Activo", default=True)
