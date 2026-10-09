import logging

from odoo.api import Environment
from odoo.models import BaseModel

_logger = logging.getLogger(__name__)


class NotifyCreatedService:

    XML_ID = "pkf_solicitud_facturas.pkf_email_template_created"

    def __init__(self, env: Environment):
        self.env = env
        self.template = env.ref(
            self.XML_ID,
            raise_if_not_found=False,
        )

    def _build_attachments(self, record: BaseModel) -> list:
        """Construye los comandos para adjuntar los archivos al correo."""
        attachments = []

        if record.pdf:
            attachments.append(
                (
                    0,
                    0,
                    {
                        "name": f"Factura_{record.folio}.pdf",
                        "datas": record.pdf,
                        "type": "binary",
                        "mimetype": "application/pdf",
                    },
                )
            )

        if record.xml:
            attachments.append(
                (
                    0,
                    0,
                    {
                        "name": f"Factura_{record.folio}.xml",
                        "datas": record.xml,
                        "type": "binary",
                        "mimetype": "application/xml",
                    },
                )
            )

        return attachments

    def _build_context(self, record: BaseModel) -> dict:
        metodo_pago = dict(record._fields["metodo_pago"].selection).get(
            record.metodo_pago, ""
        )

        return {
            "cliente": record.cliente or "",
            "descripcion": record.descripcion or "",
            "metodo_pago": metodo_pago,
            "responsable": record.responsable.name or "",
            "referencia": record.referencia or "",
            "correos": record.correos_envio or "",
            "total": f"{record.total:,.2f} {record.moneda}",
            "folio": record.folio or "",
        }

    def notify(self, record: BaseModel):
        """Envía la notificación de factura creada."""

        if not self.template:
            _logger.error(
                "No se encontró la plantilla de correo: %s",
                self.XML_ID,
            )
            return False

        email_to = record.responsable.email

        if not email_to:
            _logger.warning(
                "No se envió la notificación de la solicitud %s: "
                "el responsable %s no tiene correo electrónico.",
                record.folio,
                record.responsable.display_name,
            )
            return False

        context = self._build_context(record)
        attachments = self._build_attachments(record)

        try:
            mail_id = self.template.with_context(**context).send_mail(
                record.id,
                force_send=True,
                email_values={
                    "email_to": email_to,
                    "attachment_ids": attachments,
                },
            )

            _logger.info(
                "Notificación de factura creada en cola. "
                "Solicitud: %s, correo: %s, mail_id: %s",
                record.folio,
                email_to,
                mail_id,
            )

            return mail_id

        except Exception:
            _logger.exception(
                "Error al generar la notificación de la solicitud %s",
                record.folio,
            )
            raise
