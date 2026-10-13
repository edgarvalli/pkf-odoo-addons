import logging
from odoo.api import Environment
from .builder import ContextBuilder
from .mail_service import MailService
from .logger import EstadoCuentaLogger
from .repository import EstadoCuentaRepository
from .types import ContextType

_logger = logging.getLogger(__name__)


class EstadoCuentaService:

    def __init__(self, env: Environment):
        self.env = env
        self.mail_service = MailService(env)
        self.repo = EstadoCuentaRepository(self.env)
        self.builder = ContextBuilder(self.repo)
        self.edologger = EstadoCuentaLogger(env)

    def _schedule_emails(self, ctxs: list[ContextType], **kwargs):
        mail_server_id = self.env["ir.mail_server"].search(
            [("smtp_user", "=", "facturacion@pkfmty.com")], limit=1
        )

        try:
            for ctx in ctxs:

                self.edologger.set_context(ctx)

                ctx["mail_server_id"] = mail_server_id.id if mail_server_id else None
                _emails = ctx.get("emails")
                if not _emails:
                    self.edologger.info("No tiene correos configurados para envío.")
                    continue

                try:
                    self.mail_service.enviar_correo(ctx, **kwargs)
                    _logger.info(
                        f"Estado de cuenta enviado a {self.edologger.razonsocial} ({_emails})"
                    )
                    self.edologger.info(f"Correo enviado a {_emails}")
                except Exception as e:
                    _logger.error("Ocurrio un error {}".format(e))
                    self.edologger.error(str(e))

        except Exception as e:
            _logger.error(f"Ocurrió un error en envío masivo: {e}")

        finally:
            self.edologger.send_bitacora()

    def enviar_estado_de_cuenta(
        self, idcliente: int = None, emails: list[str] = None, **kwargs
    ):
        _logger.info("Iniciando proceso de envío de estado de cuenta...")
        include_vigentes = kwargs.get("include_vigentes", False)
        facturas = self.repo.get_facturas(idcliente, include_vigentes)
        facturas_ctx = self.builder.build(facturas, emails)
        self._schedule_emails(facturas_ctx, **kwargs)

    def enviar_edo_bulk(self, include_vigentes: bool = False):
        _logger.info("Iniciando envío masivo de estados de cuenta...")
        facturas = self.repo.getall_facturas(include_vigentes=include_vigentes)
        facturas_ctx = self.builder.build(facturas)
        self._schedule_emails(facturas_ctx)

    def run_cronjob(self):
        self.mail_service.cronjob_sendmail()
