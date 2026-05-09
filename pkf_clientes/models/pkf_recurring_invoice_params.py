from odoo import models, fields


class PKFRecurringInvoiceParams(models.Model):
    _name = "pkf.recurring.invoice.params"
    _description = "PKF Params Template"
    _rec_name = "name"

    name = fields.Char("Clave")
    value = fields.Char("Valor")
    invoice_id = fields.Many2one("pkf.recurring.invoice")
