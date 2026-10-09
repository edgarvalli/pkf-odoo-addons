from odoo import models, fields


class SolicitudFacturaLine(models.Model):
    _name = "pkf.solicitud.factura.line"
    _description = "PKF - Solicitud Factura Line"

    solicitud_factura_id = fields.Many2one(
        comodel_name="pkf.solicitud.factura",
        string="Solicitud de factura",
        required=True,
        ondelete="cascade",
        index=True,
    )

    concepto = fields.Text("Concepto")
    referencia = fields.Char("Referencia")
    importe = fields.Float("Importe")
