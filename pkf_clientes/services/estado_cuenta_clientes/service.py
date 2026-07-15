import uuid
import logging
from odoo import models

from .builder import ContextBuilder
from .mailer import enviar_correo, cronjob_sendmail
from .logger import EstadoCuentaLogger
from .repository import EstadoCuentaRepository

_logger = logging.getLogger(__name__)


class EstadoCuentaService(models.AbstractModel):
    _name = "pkf.estado.cuenta.service"
    _description = "PKF Estado Cuenta - Service"

    def enviar_estado_de_cuenta(
        self, idcliente: int = None, emails: list[str] = None, **kwargs
    ):
        _logger.info("Iniciando proceso....")

        envsudo = self.sudo().env
        edologger = EstadoCuentaLogger(envsudo)
        repo = EstadoCuentaRepository(envsudo)
        builder = ContextBuilder(repo)
        include_vigentes = kwargs.get("include_vigentes", False)

        try:
            for ctx in builder.build(idcliente, emails, include_vigentes):

                edologger.set_context(ctx)

                try:
                    _emails = ctx.get("emails")

                    if not _emails:
                        edologger.info("No tiene correos configurados para envio.")

                    else:
                        _logger.info(
                            f"Enviando estado de cuenta a cliente {edologger.razonsocial}"
                        )
                        enviar_correo(envsudo, ctx, **kwargs)
                        _logger.info(
                            f"Correo programado para el cliente {edologger.razonsocial}"
                        )

                        edologger.info(f"Correo enviado a los correos {_emails}")

                except Exception as e:
                    edologger.error(str(e))

        # except Exception as e:
        #     _logger.error(f"Ocurrio un error {e}")

        finally:
            edologger.send_bitacora()

    def run_cronjob(self):
        cronjob_sendmail(self.sudo().env)
