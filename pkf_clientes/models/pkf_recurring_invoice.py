import re
from datetime import datetime
from odoo import models, fields, api


class PKFRecurringInvoice(models.Model):
    _name = "pkf.recurring.invoice"
    _description = "PKF Factura Recurrente"
    _rec_name = "client_name"

    # Datos del cliente
    client_code = fields.Char("Codigo Cliente")
    client_rfc = fields.Char("Rfc Cliente")
    client_name = fields.Char("Cliente")

    # Datos del documento
    current_payment = fields.Integer("Pago Actual")
    total_payments = fields.Integer("Parcialidades")
    next_date = fields.Date("Proxima Factura", default=fields.Date.today)
    period_date = fields.Date("Fecha del Periodo", default=fields.Date.today)
    note = fields.Text("Observaciones")
    note_template = fields.Text("Observaciones Template")
    total_without_tax = fields.Float("Total sin Impuestos")
    move_ids = fields.One2many("pkf.recurring.invoice.move", "invoice_id")
    param_ids = fields.One2many("pkf.recurring.invoice.params", "invoice_id")

    frequency = fields.Selection(
        [
            ("monthly", "Mensual"),
            ("bimonthy", "Bimestral"),
            ("quarterly", "Trimestral"),
            ("yearly", "Anual"),
        ],
        string="Frecuencia",
        default="monthly",
        required=True,
    )

    @api.onchange("move_ids.total")
    def _onchange_move_ids(self):
        for rec in self:
            rec.total_without_tax = sum(rec.move_ids.mapped("total"))

    def _build_params(self):

        months = [
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
        ]
        today = datetime.now()

        params = {
            "current_payment": self.current_payment,
            "total_payments": self.total_payments,
            "year": today.year,
            "month": months[today.month - 1],
            "day": today.day,
        }

        for p in self.param_ids:
            if p.name:
                params[p.name] = str(p.value or "")

        return params

    @api.depends("note_template", "current_payment", "next_date")
    def _compute_note(self):
        for rec in self:
            if not rec.note_template:
                rec.note = ""
                continue

            params = rec._build_params()
            template = rec.note_template

            # 1. Reemplazar funciones {upper(key)}
            funcs = re.findall(r"\{([a-zA-Z_]+)\(([a-zA-Z0-9_]+)\)\}", template)
            for func_name, key in funcs:
                raw_val = str(params.get(key, ""))
                if func_name == "upper":
                    raw_val = raw_val.upper()
                elif func_name == "lower":
                    raw_val = raw_val.lower()

                # Reemplazo exacto de la cadena funcional
                template = template.replace(f"{{{func_name}({key})}}", raw_val)

            # 2. Reemplazar variables simples {key}
            for key, val in params.items():
                template = template.replace(f"{{{key}}}", val)

            rec.note = template
