from odoo import models, fields

email_help = "Correos separados por comas (,)"


class PKFPartnerMail(models.Model):
    _name = "pkf.email.queue"
    _description = "PKF - Cola de correos"
    _rec_name = "subject"
    _order = "create_date asc"

    subject = fields.Char("Asunto")
    email_to = fields.Char("Email To", help=email_help)
    email_cc = fields.Char("Email CC", help=email_help)
    email_bcc = fields.Char("Email BCC", help=email_help)
    body_html = fields.Html("Body", sanitize=False)
    attachment_ids = fields.Many2many("ir.attachment", string="Adjuntos")

    state = fields.Selection(
        [
            ("draft", "Borrador"),
            ("ready", "Listo para enviar"),
            ("processing", "Procesando"),
            ("sent", "Enviado"),
            ("error", "Error"),
        ],
        default="draft",
        index=True,
    )

    error_notes = fields.Text("Notas de Error", readonly=True)
    extra_data = fields.Text("Datos Extras")
    date_sent = fields.Datetime("Fecha de Envío", readonly=True)
    processing_date = fields.Datetime(index=True)

    def process_queue(self):
        self.env["pkf.mail.queue.service"].process_queue()
