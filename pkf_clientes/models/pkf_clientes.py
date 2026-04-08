from odoo.models import AbstractModel
from odoo.exceptions import UserError
from ..services.estado_cuenta_service import EstadoCuentaService


class PKFClientes(AbstractModel):
    _name = "pkf.clientes"
    _description = "PKF Clientes"

    def saldo_clientes(self, filter={}):
        edo = self.env["ev.contpaqi.comercial"].saldo_clientes(
            saldo_cero=bool(int(filter.get("saldocero", 0)))
        )
        if not edo:
            raise UserError("No se encontraron clientes")

        edo = [self.env["ev.tools"].dict_parser(e) for e in edo]
        return edo

    def enviar_estado_cuenta(self, idcliente: int, emails: list[str] = None):
        srv = EstadoCuentaService(self.env)
        return srv.enviar_estado_cuenta_cliente(idcliente, emails)
