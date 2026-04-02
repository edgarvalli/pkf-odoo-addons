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
            _cliente_name = cliente.get("razon_social")
            _cliente_rfc = cliente.get("rfc")

            try:
                # enviar correo

                _logger.info(f"Enviando estado de cuenta a cliente {_cliente_name}")
                emails = cliente.get("emails")
                if not emails:
                    self._set_log(
                        cliente=_cliente_name,
                        rfc=_cliente_rfc,
                        evento="No tiene correos configurados para envio.",
                    )
                else:
                    edo.enviar_correo(cliente)

                    self._set_log(
                        cliente=_cliente_name,
                        rfc=_cliente_rfc,
                        evento=f"Correo enviado a los correos {emails}",
                    )

            except Exception as e:
                self._set_log(
                    cliente=_cliente_name,
                    rfc=_cliente_rfc,
                    estatus="error",
                    evento=str(e),
                )

        self.env["pkf.envios.logs"].send_bitacora(
            uid=self.uid, start=start_process, end=datetime.now()
        )

    def run_envios_facturas(self, attachment_id: int, uid: str, send_to_client=False):
        srv = EnvioFacturasClienteService(self.env)
        srv._job_enviar(attachment_id, uid, send_to_client)
