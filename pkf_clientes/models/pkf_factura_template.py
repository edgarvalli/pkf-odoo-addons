from odoo.exceptions import UserError
from odoo import fields, models, api


class PKFFacturaTemplate(models.Model):
    _name = "pkf.factura.template"
    _description = "PKF - Factura Template"
    _rec_name = "razonsocial"

    iddocumentode = fields.Integer("ID Documento Modelo", default=4)
    idconcepto = fields.Integer("ID Concepto", default=3015)
    idcomercial = fields.Integer("ID Comercial", index=True)
    idcliente = fields.Integer("ID Cliente")
    idmoneda = fields.Integer("ID Moneda")
    codigo_cliente = fields.Char("Codigo Cliente")
    moneda = fields.Char("Moneda")
    codigo_concepto = fields.Char("Codigo Concepto")
    concepto = fields.Char("Concepto")
    serie = fields.Char("Serie", index=True)
    folio = fields.Integer("Folio", index=True)
    razonsocial = fields.Char("Razon Social")
    rfc = fields.Char("Rfc")
    uuid = fields.Char("UUID")
    email_queue_id = fields.Many2one("pkf.email.queue", string="Correo Programado")
    pago = fields.Integer("Pago", default=1)
    total_pagos = fields.Integer("Total Pagos", default=12)
    total = fields.Monetary(
        "Total", compute="_compute_total", store=True, currency_field="currency_id"
    )
    referencia = fields.Char("Referencia")
    observaciones_template = fields.Text("Observaciones Template")
    observaciones_preview = fields.Text(
        "Preview", store=False, compute="_compute_render_template"
    )
    moves_ids = fields.One2many(
        "pkf.factura.template.moves", "template_id", string="Movimientos"
    )
    currency_id = fields.Many2one(
        "res.currency",
        string="Moneda",
        default=lambda self: self.env.company.currency_id.id,
    )

    active = fields.Boolean(
        "Activo", default=True, compute="_compute_check_active", store=True
    )

    @api.depends("moves_ids.neto")
    def _compute_total(self):
        for rec in self:
            rec.total = sum(rec.moves_ids.mapped("neto"))

    def _compute_render_template(self):
        renderer = self.env["pkf.factura.template.renderer"]

        for rec in self:
            rec.observaciones_preview = renderer.render(rec)

    @api.depends("pago", "total_pagos")
    def _compute_check_active(self):
        for rec in self:
            rec.active = rec.pago <= rec.total_pagos

    def get_factura_metadata(self):
        service = self.env["pkf.contpaqi.factura.service"]
        return service.get_metadata()

    @api.model
    def import_facturas_by_serie_folio(self, folios: list[dict]):
        srv = self.env["pkf.contpaqi.factura.service"]
        vals_list = []

        foliosFiltered = [
            folio
            for folio in folios
            if not self.search(
                [
                    ("serie", "=", folio.get("serie", "")),
                    ("folio", "=", folio.get("folio", 0)),
                ],
                limit=1,
            )
        ]

        if foliosFiltered:
            for doc in srv.get_documentos_by_serie_folio(foliosFiltered):
                movimientos = doc.pop("movimientos", [])
                doc["moves_ids"] = [
                    (0, 0, self._build_move_vals(mov)) for mov in movimientos
                ]
                vals_list.append(doc)
            return self.create(vals_list)

    @api.model
    def create_template(self, vals):
        movimientos = vals.pop("movimientos", [])

        vals["moves_ids"] = [(0, 0, self._build_move_vals(mov)) for mov in movimientos]

        return self.create(vals)

    @api.model
    def write_template(self, template_id, vals):
        template = self.browse(template_id).exists()
        if not template:
            raise UserError(f"Template {template_id} no encontrado")

        movimientos = vals.pop("movimientos", [])

        commands = []

        # IDs actuales en BD
        current_ids = set(template.moves_ids.ids)

        # IDs recibidos desde React
        received_ids = {mov["id"] for mov in movimientos if mov.get("id")}

        # Eliminar movimientos que ya no vienen
        for move_id in current_ids - received_ids:
            commands.append((2, move_id))

        # Crear o actualizar
        for mov in movimientos:
            move_id = mov.get("id")

            if move_id:
                commands.append(
                    (
                        1,
                        move_id,
                        self._build_move_vals(mov),
                    )
                )
            else:
                commands.append(
                    (
                        0,
                        0,
                        self._build_move_vals(mov),
                    )
                )

        vals["moves_ids"] = commands

        template.write(vals)
        template.write({"active": template.pago < template.total_pagos})

        return True

    @api.model
    def get_template(self, template_id):

        t = self.browse(int(template_id))

        if not t:
            raise UserError(f"Template {template_id} no encontrado")
        data = {
            "id": t.id,
            "idmoneda": t.idmoneda,
            "idconcepto": t.idconcepto,
            "idcliente": t.idcliente,
            "razonsocial": t.razonsocial,
            "codigo_cliente": t.codigo_cliente,
            "rfc": t.rfc,
            "uuid": t.uuid,
            "referencia": t.referencia,
            "observaciones_template": t.observaciones_template,
            "pago": t.pago,
            "total_pagos": t.total_pagos,
            "movimientos": [
                move.read(
                    fields=[
                        "id",
                        "idproducto",
                        "unidades",
                        "precio",
                        "producto",
                        "segmento",
                        "codigo_producto",
                    ]
                )[0]
                for move in t.moves_ids
            ],
        }
        return data

    def process_template(self, cert_password):
        return self.env["pkf.factura.process.service"].process(cert_password)

    def get_config(self):
        contpaqi_api_url = (
            self.env["ir.config_parameter"].sudo().get_param("contpaqi_api_url")
        )
        return {"contpaqi_api_url": contpaqi_api_url}

    def save_config(self, vals: dict):
        config = self.env["ir.config_parameter"].sudo()
        for key, val in vals.items():
            config.set_param(key, val)

        return True

    def _build_move_vals(self, mov):
        return {
            "idproducto": mov["idproducto"],
            "producto": mov["producto"],
            "codigo_producto": mov["codigo_producto"],
            "unidades": mov["unidades"],
            "precio": mov["precio"],
            "segmento": mov.get("segmento", ""),
        }
