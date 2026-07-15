from odoo import models, fields


class MailMail(models.Model):
    _inherit = "mail.mail"

    isbatch = fields.Boolean("Es lote")
