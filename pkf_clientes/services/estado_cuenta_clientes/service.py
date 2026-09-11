import logging
from odoo.api import Environment
from .builder import ContextBuilder
from .mail_service import MailService
from .logger import EstadoCuentaLogger
from .repository import EstadoCuentaRepository

_logger = logging.getLogger(__name__)


class EstadoCuentaService:

    def __init__(self, env: Environment):
        self.mail_service = MailService(env)

    def enviar_estado_de_cuenta(
        self, idcliente: int = None, emails: list[str] = None, **kwargs
    ):
        _logger.info("Iniciando proceso....")

        edologger = EstadoCuentaLogger(self.env)
        repo = EstadoCuentaRepository(self.env)
        builder = ContextBuilder(repo)
        include_vigentes = kwargs.get("include_vigentes", False)
        mail_server_id = self.env["ir.mail_server"].search(
            [("smtp_user", "=", "facturacion@pkfmty.com")]
        )

        try:
            for ctx in builder.build(idcliente, emails, include_vigentes):

                edologger.set_context(ctx)
                ctx["mail_server_id"] = mail_server_id.id

                try:
                    _emails = ctx.get("emails")

                    if not _emails:
                        edologger.info("No tiene correos configurados para envio.")

                    else:

                        self.mail_service.enviar_correo(self.env, ctx, **kwargs)

                        _logger.info(
                            f"Correo programado para el cliente {edologger.razonsocial}"
                        )

                        _logger.info(
                            f"Enviando estado de cuenta a cliente {edologger.razonsocial}"
                        )

                        edologger.info(f"Correo enviado a los correos {_emails}")

                except Exception as e:
                    edologger.error(str(e))

        except Exception as e:
            _logger.error(f"Ocurrio un error {e}")

        finally:
            edologger.send_bitacora(mail_server_id.id)

    def run_cronjob(self):
        self.mail_service.cronjob_sendmail()
