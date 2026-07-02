import base64
from odoo import http
from ..services.mailer_bak import Mailer, Attachment


class ApiController(http.Controller):

    @http.route("/pkfmty/fact")
    def test_fact(self):
        return "Workd"

    @http.route("/pkfmty/process", type="http", auth="public", methods=["GET"])
    def process_status(self):
        data = (
            http.request.env["pkf.email.queue"]
            .sudo()
            .search_read([("state", "=", "error")])
        )
        if not data:
            return {"error": True, "message": "No se encontro informacion"}

        return {"error": False, "data": data}

    @http.route(
        "/pkfmty/api/v1/factura-template/process",
        type="json2",
        auth="none",
        csrf=False,
        methods=["POST"],
    )
    def process_route(self):
        # return "OK"
        process_key = "pkf.factura.template.process_uuid"
        body: dict = http.request.get_json_data()
        uid = body.get("uuid", None)
        job_id = body.get("job_id", 0)
        config = http.request.env["ir.config_parameter"].sudo()

        if uid and param and param.value != uid:
            param = config.search(
                [("key", "=", process_key)],
                limit=1,
            )

            if param and param.value != uid:
                return {
                    "error": True,
                    "status": 500,
                    "message": "No se encontro el UUID",
                }

        param.unlink()
        config.set_param("pkf.factura.template.last_job_id", str(job_id))

        with Mailer() as mailer:

            body_html = f"""
                <div>
                    <h1>Se ha completado el processo con UUID: {uid}</h1>
                    <br>
                    <p>Adjunto encontrara la bitacora</p>
                </div>
            """
            log_datas = body.get("log_datas", "")
            attach = Attachment(
                data=base64.b64decode(log_datas),
                maintype="text",
                subtype="plain",
                filename=body.get("log_name", f"bitacora_{uid}.txt"),
            )

            mailer.build_email(
                email_to=http.request.env.user.email,
                email_cc="edgarvalli80@gmail.com",
                html=body_html,
                subject=f"Facturas creadas // {uid}",
                attachments=[attach],
            ).send()

            return {"error": False, "status": 200, "message": "ok"}
