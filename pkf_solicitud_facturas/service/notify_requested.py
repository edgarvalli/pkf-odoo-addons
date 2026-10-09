import logging

from odoo.api import Environment
from odoo.models import BaseModel

_logger = logging.getLogger(__name__)


class NotifyRequestedService:
    """Notifica al grupo de Facturación cuando se solicita una factura."""

    TEMPLATE_XML_ID = "pkf_solicitud_facturas.pkf_email_template_requested"
    GROUP_XML_ID = "pkf_solicitud_facturas.group_facturacion_users"

    def __init__(self, env: Environment):
        self.env = env

        self.template = env.ref(
            self.TEMPLATE_XML_ID,
            raise_if_not_found=False,
        )

        if not self.template:
            _logger.warning(
                "No se encontró la plantilla de correo: %s",
                self.TEMPLATE_XML_ID,
            )

    # ---------------------------------------------------------
    # Contexto de la plantilla
    # ---------------------------------------------------------

    def _build_context(self, record: BaseModel) -> dict:
        metodo_pago = dict(record._fields["metodo_pago"].selection).get(
            record.metodo_pago, ""
        )

        moneda = record.moneda or ""

        partidas = [
            {
                "concepto": line.concepto or "",
                "referencia": line.referencia or "",
                "importe": f"{line.importe:,.2f}",
            }
            for line in record.solicitud_factura_lines
        ]

        return {
            "folio": record.folio or "",
            "cliente": record.cliente or "",
            "total": f"{record.total:,.2f} {moneda}",
            "moneda": moneda,
            "metodo_pago": metodo_pago,
            "responsable": record.responsable.name if record.responsable else "",
            "correos": record.correos_envio or "",
            "partidas": partidas,
        }

    # ---------------------------------------------------------
    # Adjuntos
    # ---------------------------------------------------------

    def _build_attachments(self, record: BaseModel) -> list:
        """Construye los adjuntos para el correo."""

        if not record.csf:
            return []

        return [
            (
                0,
                0,
                {
                    "name": f"Constancia_{record.folio or record.id}.pdf",
                    "datas": record.csf,
                    "type": "binary",
                    "mimetype": "application/pdf",
                },
            )
        ]

    # ---------------------------------------------------------
    # Destinatarios
    # ---------------------------------------------------------

    def _build_emails(self) -> str:
        """Obtiene los correos únicos de los usuarios de Facturación."""

        group = self.env.ref(
            self.GROUP_XML_ID,
            raise_if_not_found=False,
        )

        if not group:
            _logger.warning(
                "No se encontró el grupo de Facturación: %s",
                self.GROUP_XML_ID,
            )
            return ""

        emails = {
            email.strip()
            for email in group.user_ids.mapped("email")
            if email and email.strip()
        }

        if not emails:
            _logger.warning(
                "El grupo de Facturación no tiene usuarios con "
                "correo electrónico: %s",
                self.GROUP_XML_ID,
            )
            return ""

        return ",".join(sorted(emails))

    # ---------------------------------------------------------
    # Envío
    # ---------------------------------------------------------

    def _send_email(self, record: BaseModel):
        """Genera el correo y lo deja en la cola de Odoo."""

        if not self.template:
            return False

        emails = self._build_emails()

        if not emails:
            _logger.warning(
                "No se envió la notificación de la solicitud %s: "
                "no hay destinatarios.",
                record.folio or record.id,
            )
            return False

        context = self._build_context(record)
        attachments = self._build_attachments(record)

        mail_id = self.template.with_context(**context).send_mail(
            record.id,
            force_send=True,
            email_values={
                "email_to": emails,
                "attachment_ids": attachments,
            },
        )

        _logger.info(
            "Notificación de solicitud generada. Folio: %s, "
            "destinatarios: %s, mail_id: %s",
            record.folio or record.id,
            emails,
            mail_id,
        )

        return mail_id

    # ---------------------------------------------------------
    # API pública del servicio
    # ---------------------------------------------------------

    def notify(self, record: BaseModel):
        """Punto de entrada utilizado por el modelo."""

        return self._send_email(record)
