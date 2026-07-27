from odoo import models, fields


class PKFPartnerGroup(models.Model):
    _name = "pkf.partner.group"
    _description = "PKF - Grupo de Cliente"

    name = fields.Char("Nombre Grupo")
    active = fields.Boolean("Activo", default=True)
