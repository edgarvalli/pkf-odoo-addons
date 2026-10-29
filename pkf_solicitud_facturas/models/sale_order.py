from odoo import models, fields


class SaleOrder(models.Model):
    _inherit = "sale.order"

    pkf_solicitud_factura_id = fields.Many2one(
        "pkf.solicitud.factura",
        "Solicitud de Factura",
        copy=False,
        readonly=True,
    )

    def crear_solicitud_factura(self):
        self.ensure_one()

        solicitud_factura = self.env["pkf.solicitud.factura"]

        if self.pkf_solicitud_factura_id:
            return

        vals = {
            "sale_order_id": self.id,
            "responsable": self.env.user.id,
            "partner_id": self.partner_id.id,
            "currency_id": self.currency_id.id,
            "solicitud_factura_lines": [],
        }

        for line in self.order_line:
            name = line.name.split("\n", maxsplit=1)
            val = {
                "concepto": name[0],
                "referencia": name[1] if len(name) > 1 else "",
                "importe": line.price_subtotal,
            }
            vals["solicitud_factura_lines"].append((0, 0, val))

        solicitud = solicitud_factura.create(vals)
        self.pkf_solicitud_factura_id = solicitud.id

        return {
            "type": "ir.actions.act_window",
            "name": "Solicitud de factura",
            "res_model": "pkf.solicitud.factura",
            "view_mode": "form",
            "res_id": solicitud.id,
            "target": "current",
        }
