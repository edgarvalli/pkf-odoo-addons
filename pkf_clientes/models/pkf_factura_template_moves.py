from odoo import fields, models, api


class PKFFacturaTemplateMoves(models.Model):
    _name = "pkf.factura.template.moves"
    _description = "PKF - Movimientos Factura Template"

    template_id = fields.Many2one(
        "pkf.factura.template", required=True, ondelete="cascade"
    )
    idcomercial = fields.Integer("ID Comercial", index=True)
    idproducto = fields.Integer("ID Producto")
    producto = fields.Char("Producto")
    codigo_producto = fields.Char("Codigo Producto")
    unidades = fields.Float("Unidades")
    precio = fields.Monetary("Precio", currency_field="currency_id")
    segmento = fields.Char("Segmento")
    neto = fields.Monetary(
        "Neto", compute="_compute_neto", store=True, currency_field="currency_id"
    )

    currency_id = fields.Many2one(
        "res.currency",
        string="Moneda",
        default=lambda self: self.env.company.currency_id.id,
    )

    @api.depends("unidades", "precio")
    def _compute_neto(self):
        for rec in self:
            rec.neto = rec.unidades * rec.precio
