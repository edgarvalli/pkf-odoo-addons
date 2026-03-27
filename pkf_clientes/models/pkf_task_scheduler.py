import logging, uuid
from odoo import models
from datetime import datetime
from ..services import (
    EstadoCuentaService,
    SaldosComercialService,
    EnvioFacturasClienteService,
)

_logger = logging.getLogger(__name__)


class PKFTaskScheduler(models.AbstractModel):
    _name = "pkf.clientes.taskscheduler"
    _description = "Tareas Programadas PKF"

    uid: str = str(uuid.uuid4())

    def _set_log(self, **kwargs):
        self = self.sudo()
        self.env["pkf.envios.logs"].create(
            {
                "uuid": self.uid,
                "fecha": datetime.now(),
                "cliente": kwargs.get("cliente", "System"),
                "rfc": kwargs.get("rfc", "XAXX01010100"),
                "estatus": kwargs.get("estatus", "ok"),
                "evento": kwargs.get("evento", ""),
            }
        )

    def run_unlink_envios_facturas_jobs(self):
        srv = EnvioFacturasClienteService(self.env)
        srv.unlink_jobs()

    def run_saldos_comercial(self):

        edo = EstadoCuentaService(self.env)

        data = SaldosComercialService(self.env).get_saldos()

        _logger.info("Iniciando proceso....")
        start_process = datetime.now()
        for cliente in data:
            try:
                # enviar correo

                _cliente_name = cliente.get("razon_social")
                _logger.info(f"Enviando estado de cuenta a cliente {_cliente_name}")
                emails = cliente.get("email_to", None)
                if not emails or emails == "":
                    self._set_log(
                        cliente=_cliente_name,
                        rfc=cliente["rfc"],
                        evento="No tiene correos configurados para envio.",
                    )
                else:
                    edo.enviar_correo(cliente)

                    self._set_log(
                        cliente=_cliente_name,
                        rfc=cliente["rfc"],
                        evento="Correo enviado",
                    )

            except Exception as e:
                self._set_log(
                    cliente=cliente["razon_social"],
                    rfc=cliente["rfc"],
                    estatus="error",
                    evento=str(e),
                )

        self.env["pkf.envios.logs"].send_bitacora(
            uid=self.uid, start=start_process, end=datetime.now()
        )
