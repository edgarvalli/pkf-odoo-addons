from odoo import models, fields, api


class PKFRecurringInvoiceMove(models.Model):
    _name = "pkf.recurring.invoice.move"
    _description = "PKF Invoice Move"
    _rec_name = "code"

    invoice_id = fields.Many2one("pkf.recurring.invoice")
    code = fields.Char("Codigo")
    name = fields.Char("Nombre")
    description = fields.Text("Descripción")
    amount = fields.Float("Cantidad")
    price = fields.Float("Precio")
    total = fields.Float("Total", compute="_compute_total")

    @api.depends("price", "amount")
    def _compute_total(self):
        for rec in self:
            rec.total = rec.amount * rec.price
