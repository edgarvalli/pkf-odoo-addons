from odoo import fields, models, api
from odoo.exceptions import UserError
from ..service.notify_requested import NotifyRequestedService
from ..service.notify_created import NotifyCreatedService


class SolicitudFactura(models.Model):
    _name = "pkf.solicitud.factura"
    _description = "PKF - Solicitud de Factura"
    _inherit = ["mail.thread", "mail.activity.mixin"]
    _rec_name = "folio"

    folio = fields.Char(
        string="Folio",
        compute="_compute_folio",
    )

    cliente = fields.Char(
        string="Cliente",
        required=True,
        tracking=True,
    )

    cliente_nuevo = fields.Boolean(
        string="Es cliente nuevo",
    )

    csf = fields.Binary(
        string="Constancia de situación fiscal",
        attachment=True,
    )

    responsable = fields.Many2one(
        "res.users",
        string="Responsable",
        default=lambda self: self.env.user,
        required=True,
        tracking=True,
    )

    moneda = fields.Selection(
        selection=[
            ("MXN", "Pesos Mexicanos"),
            ("USD", "Dólares"),
            ("EUR", "Euros"),
        ],
        string="Moneda",
        required=True,
        default="MXN",
    )

    metodo_pago = fields.Selection(
        selection=[
            ("PPD", "Pago en parcialidades diferidas"),
            ("PUE", "Pago en una sola exhibición"),
        ],
        string="Método de pago",
        required=True,
        default="PPD",
    )

    correos_envio = fields.Char(
        string="Correos para envío", help="Separar los correos por coma (,)"
    )

    estatus = fields.Selection(
        string="Estatus",
        selection=[
            ("draft", "Borrador"),
            ("requested", "Solicitado"),
            ("created", "Creado"),
        ],
        default="draft",
        tracking=True,
        required=True,
    )

    solicitud_factura_lines = fields.One2many(
        comodel_name="pkf.solicitud.factura.line",
        inverse_name="solicitud_factura_id",
        string="Partidas",
        copy=True,
    )

    total = fields.Float(
        string="Total sin IVA",
        compute="_compute_total",
        store=True,
        digits=(16, 2),
    )

    pdf = fields.Binary(
        string="Factura PDF",
        attachment=True,
    )

    xml = fields.Binary(
        string="Factura XML",
        attachment=True,
    )

    es_usuario_facturacion = fields.Boolean(
        string="Es usuario de facturación",
        compute="_compute_es_usuario_facturacion",
    )

    # ---------------------------------------------------------
    # Campos calculados
    # ---------------------------------------------------------

    @api.depends("solicitud_factura_lines.importe")
    def _compute_total(self):
        for record in self:
            record.total = sum(record.solicitud_factura_lines.mapped("importe"))

    def _compute_folio(self):
        for record in self:
            record.folio = str(record.id).zfill(5) if record.id else "Nuevo"

    @api.depends_context("uid")
    def _compute_es_usuario_facturacion(self):
        pertenece = self.env.user.has_group(
            "pkf_solicitud_facturas.group_facturacion_users"
        )

        for record in self:
            record.es_usuario_facturacion = pertenece

    # ---------------------------------------------------------
    # Validaciones
    # ---------------------------------------------------------

    @api.constrains("cliente_nuevo", "csf")
    def _check_csf(self):
        for record in self:
            if record.cliente_nuevo and not record.csf:
                raise UserError(
                    "Debe adjuntar la constancia de situación fiscal "
                    "cuando se trata de un cliente nuevo."
                )

    # ---------------------------------------------------------
    # Creación y notificación
    # ---------------------------------------------------------

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            vals["estatus"] = "requested"

        records = super().create(vals_list)

        srv = NotifyRequestedService(self.env)
        for record in records:
            srv.notify(record)

        return records

    # ---------------------------------------------------------
    # Escritura y notificación
    # ---------------------------------------------------------

    def write(self, vals):
        estados_anteriores = {record.id: record.estatus for record in self}

        # Si el usuario intenta marcar la solicitud como creada,
        # validar los documentos que tendrá después del write.
        if vals.get("estatus") == "created":
            for record in self:
                pdf = vals.get("pdf") or record.pdf
                xml = vals.get("xml") or record.xml

                if not pdf:
                    raise UserError(
                        "Debe subir el PDF antes de marcar la solicitud como creada."
                    )

                if not xml:
                    raise UserError(
                        "Debe subir el XML antes de marcar la solicitud como creada."
                    )

        # Guardar primero los cambios solicitados.
        result = super().write(vals)

        # Si se modificaron los documentos, comprobar si ya están ambos.
        if "pdf" in vals or "xml" in vals:
            for record in self:
                if record.pdf and record.xml and record.estatus != "created":
                    record.write({"estatus": "created"})

        # Detectar las solicitudes que acaban de pasar a "created".
        registros_creados = self.filtered(
            lambda record: (
                estados_anteriores.get(record.id) != "created"
                and record.estatus == "created"
            )
        )

        # Notificar solo en la transición al estado "created".
        if registros_creados:
            srv = NotifyCreatedService(self.env)

            for record in registros_creados:
                srv.notify(record)

        return result

    # ---------------------------------------------------------
    # Normalización de correos
    # ---------------------------------------------------------

    @api.onchange("correos_envio")
    def _onchange_correos_envio(self):
        for record in self:
            if record.correos_envio:
                correos = [correo.strip() for correo in record.correos_envio.split(",")]
                record.correos_envio = ",".join(correos)

    # ---------------------------------------------------------
    # Validación al cambiar el estado desde el formulario
    # ---------------------------------------------------------

    @api.onchange("estatus")
    def _onchange_estatus(self):
        for record in self:
            if record.estatus != "created":
                continue

            if not record.pdf:
                record.estatus = "requested"
                return {
                    "warning": {
                        "title": "Validación",
                        "message": "Debe subir el PDF antes de marcar "
                        "la solicitud como creada.",
                    }
                }

            if not record.xml:
                record.estatus = "requested"
                return {
                    "warning": {
                        "title": "Validación",
                        "message": "Debe subir el XML antes de marcar "
                        "la solicitud como creada.",
                    }
                }
