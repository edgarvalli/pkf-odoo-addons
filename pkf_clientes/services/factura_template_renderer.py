from jinja2 import Template
from odoo import fields, models

MONTHS = (
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
)


class FacturaTemplateRenderer(models.AbstractModel):
    _name = "pkf.factura.template.renderer"
    _description = "PKF - Factura Template Renderer"

    def build_vars(self, factura):
        today = fields.Datetime.now()

        return {
            "pago": factura.pago,
            "total_pagos": factura.total_pagos,
            "month": MONTHS[today.month - 1],
            "MONTH": MONTHS[today.month - 1].upper(),
            "year": today.year,
            "reference": factura.referencia,
        }

    def render(self, factura):
        if not factura.observaciones_template:
            return ""

        params = self.build_vars(factura)

        try:
            template = Template(factura.observaciones_template)
            return template.render(**params)

        except Exception as ex:
            return f"Error renderizando template: {str(ex)}"
