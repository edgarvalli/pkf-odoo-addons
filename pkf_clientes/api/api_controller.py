from odoo.http import Controller, request
from .tools import api_route, api_ok, api_error


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
        pkf = request.env["pkf.clientes.acciones"]
        result = pkf.enviar_estado_de_cuenta(id)
        if result.error:
            return api_error(message=result.message)
        return api_ok(data={}, message="Se envio correo correctamente.")
