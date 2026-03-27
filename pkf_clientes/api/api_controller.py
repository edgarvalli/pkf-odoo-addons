from odoo.http import Controller, request
from ..utils.api_tools import api_route, api_ok, api_error
from ..services import EstadoCuentaService, EnvioFacturasClienteService
import logging

_logger = logging.getLogger(__name__)


def clientes_url(path: str = ""):
    return f"/comercial/clientes{path}"


class ApiController(Controller):

    @api_route(clientes_url(), type="http", auth="user", methods=["GET"])
    def api_clientes(self, **kwargs):
        clientes = request.env["ev.contpaqi.comercial"].clientes(**kwargs)
        if not clientes:
            return api_error("No se encontraron clientes")
        return api_ok(data=clientes)

    @api_route(clientes_url("/saldos"), type="http", auth="user", methods=["GET"])
    def api_estado_de_cuenta(self, **kwargs):
        edo = self.env["ev.contpaqi.comercial"].saldo_clientes(
            saldo_cero=bool(int(kwargs.get("saldocero", 0)))
        )
        if not edo:
            return api_error(message="No se encontraron clientes")

        edo = [self.env["ev.tools"].dict_parser(e) for e in edo]
        return api_ok(data=edo)

    @api_route(
        clientes_url("/saldos/<int:id>/detalle"),
        type="http",
        auth="user",
        methods=["GET"],
    )
    def api_edo_cliente_detalle(self, id):
        evcomercial = request.env["ev.contpaqi.comercial"]
        return api_ok(data=evcomercial.saldo_cliente_detalle(id=id))

    @api_route(
        clientes_url("/saldos/<int:id>/enviar"),
        type="http",
        auth="user",
        methods=["GET"],
    )
    def api_enviar_edo(self, id):
        edo = EstadoCuentaService(env=request.env)
        result = edo.enviar_estado_cuenta_cliente(id)
        if not result and result == False:
            return api_error(message=result.message)
        return api_ok(data={}, message="Se envio correo correctamente.")

    @api_route(
        clientes_url("/envio-facturas"),
        type="http",
        auth="user",
        methods=["POST"],
        csrf=False,
    )
    def api_enviar_facturas_zip(self):
        _logger.info("Obteniendo ZIP")
        file = request.httprequest.files.get("file")

        send_to_client = request.httprequest.form.get("send_to_client", "0")
        send_to_client = int(send_to_client) == 1

        if not file:
            return api_error("No envio un archivo")

        envio_srv = EnvioFacturasClienteService(request.env)

        result = envio_srv.enviar_todos(file, send_to_client)

        uid = result.get("uid")

        message = (
            "Se envio los correos correctamente"
            if result.get("type") == "instant"
            else f"Correos programados. UUID {uid}"
        )

        return api_ok(message=message)
