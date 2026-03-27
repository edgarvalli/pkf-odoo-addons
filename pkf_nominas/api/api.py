from .tools import api_route
from odoo.exceptions import UserError
from odoo.http import Controller, request


class ApiController(Controller):

    @api_route("nominas/recibo/crear", auth="user", type="http", methods=["GET"])
    def api_print_document(self, **kwargs):

        evnominas = request.env["ev.contpaqi.nominas"]

        empleado = request.env["pkf.nominas"].empleado()

        iddocumento = int(kwargs.get("iddocumento", 0))
        doc_type = kwargs.get("type", "pdf")

        if not evnominas.verificar_pertenencia_comprobante(
            empleado.get("codigo"), iddocumento
        ):
            raise UserError(f"El documento no pertenece a {empleado.codigo}")

        datos = evnominas.datos_comprobante(iddocumento)

        resp: dict = request.env["pkf.nominas"].make_document(datos, doc_type)
        return request.make_response(resp["content"], resp["headers"])

    @api_route("nominas/recibos", type="http", auth="user", methods=["GET"])
    def api_get_recibos(self, **kwargs):
        try:
            empleado = request.env["pkf.nominas"].empleado()
            params = {"idempleado": empleado.get("id") or 0, **kwargs}
            comprobantes = request.env["ev.contpaqi.nominas"].comprobantes(**params)
            return request.make_json_response({"error": False, "data": comprobantes})
        except Exception as e:
            return request.make_json_response({"error": True, "message": str(e)})
