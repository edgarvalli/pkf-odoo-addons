from .tools import api_route, api_error, api_ok
from odoo.exceptions import UserError
from odoo.http import Controller, request
from ..services import Empleado, ComprobanteNomina


class ApiController(Controller):

    @api_route(
        "nominas/recibos/<int:id>/crear", auth="user", type="http", methods=["GET"]
    )
    def api_make_document(self, id, **kwargs):
        try:
            c = ComprobanteNomina(request.env, id)
            doc_type = kwargs.get("type", "pdf")
            if doc_type == "xml":
                headers = [("Content-Type", "application/xml; charset=utf-8")]
                return request.make_response(c.get_xml(), headers=headers)
            else:
                resp = c.make_pdf()
                return request.make_response(resp["content"], resp["headers"])

        except Exception as e:
            raise UserError(str(e))

    @api_route("nominas/recibos", type="http", auth="user", methods=["GET"])
    def api_get_recibos(self, **kwargs):
        try:
            empleado = Empleado(env=request.env)
            comprobantes = empleado.get_comprobantes(**kwargs)
            return api_ok(data=comprobantes)
        except Exception as e:
            return api_error(msg=str(e))

    @api_route(
        "nominas/recibos/bulk", type="http", auth="user", methods=["POST"], csrf=False
    )
    def api_bulk_recibos(self):
        data = request.get_json_data()
        if not "ids" in data:
            return api_error(
                msg="Debe de enviar la propiedad ids con los id de los comprobantes."
            )

        ids = data["ids"]

        uid, nextcall = request.env["pkf.nominas"].enqueue_builk_recibos(ids)
        date = nextcall.strftime("%d/%m/%Y %H:%M:%S")

        return api_ok(
            message=f"Se programo el envio de tus comprobantes {date} con un ID: {uid}"
        )
