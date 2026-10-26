import logging
from odoo.api import Environment

from .builder import ContextBuilder
from .logger import EstadoCuentaLogger

from ..models.context import Context
from ..models.factura import Factura
from ..services.mail_service import MailService
from ..repositories.estado_cuenta import EstadoCuentaRepository

_logger = logging.getLogger(__name__)


class EstadoCuentaService:

    def __init__(self, env: Environment):
        self.env = env
        self.mail_service = MailService(env)
        self.repo = EstadoCuentaRepository(self.env)
        self.builder = ContextBuilder(self.repo)
        self.edologger = EstadoCuentaLogger(env)

    def _schedule_emails(self, ctxs: list[Context], **kwargs):
        mail_server_id = self.env["ir.mail_server"].search(
            [("smtp_user", "=", "facturacion@pkfmty.com")], limit=1
        )

        try:
            for ctx in ctxs:

                if len(ctx.facturas) == 0:
                    continue

                self.edologger.set_context(ctx)
                ctx.mail_server_id = mail_server_id.id if mail_server_id else None
                if not ctx.emails:
                    self.edologger.info("No tiene correos configurados para envío.")
                    continue

                try:
                    self.mail_service.enviar_correo(ctx, **kwargs)
                    _logger.info(
                        f"Estado de cuenta enviado a {self.edologger.razonsocial} ({ctx.emails})"
                    )
                    self.edologger.info(f"Correo enviado a {ctx.emails}")
                except Exception as e:
                    _logger.error("Ocurrio un error {}".format(e))
                    self.edologger.error(str(e))

        except Exception as e:
            _logger.error(f"Ocurrió un error en envío masivo: {e}")

        finally:
            # self.edologger.send_bitacora()
            print("Wokrd")

    def _send(self, facturas: list[Factura], emails: list[str] = None, **kvargs):
        facturas_ctx = self.builder.build(facturas, emails)
        self._schedule_emails(facturas_ctx, **kvargs)

    def enviar_estado_de_cuenta(
        self, idcliente: int = None, emails: list[str] = None, **kvargs
    ):
        _logger.info("Iniciando proceso de envío de estado de cuenta...")
        include_vigentes = kvargs.get("include_vigentes", False)
        facturas = self.repo.get_facturas(idcliente, include_vigentes)
        self._send(facturas, emails, **kvargs)

    def enviar_estado_de_cuenta_masivo(self, include_vigentes: bool = False):
        _logger.info("Iniciando envío masivo de estados de cuenta...")
        facturas = self.repo.getall_facturas(include_vigentes=include_vigentes)
        self._send(facturas)

    def run_cronjob(self):
        self.mail_service.cronjob_sendmail()
