from odoo.http import Controller, route, request
from typing import Literal
from odoo.exceptions import UserError


def api_error(msg: str, type: Literal["database", "auth"]):
    return request.make_json_response({"error": True, "message": msg, "type": type})


class AppController(Controller):

    @route(
        "/pkfmty/authenticate",
        methods=["POST"],
        auth="none",
        type="http",
        csrf=False,
    )
    def pkfmty_authenticate(self):
        db = request.db
        if not db:
            return api_error("Debe de iniciar sesión en /web/login", "database")

        data: dict = request.get_json_data()
        username = data.get("username")
        if not username:
            return api_error("Debes de enviar usuario.", "auth")

        password = data.get("password")
        if not password:
            return api_error("Debes de enviar el password.", "auth")

        env = request.env
        credential = {"type": "password", "login": username, "password": password}

        uid = request.session.authenticate(env, credential)

        if not uid:
            return api_error("El usuario no existe o no esta autorizado.", "auth")

        return request.make_json_response({"db": db, "uid": uid, "error": False})

    @route("/pkfmty/menu", methods=["POST", "GET"], auth="user", type="http")
    def app_menu(self):
        menu = request.env["pkf.app.menu"].search_read(
            [("group_ids", "in", request.env.user.group_ids.ids)],
            fields=["name", "text", "url", "icon"],
        )
        return request.make_json_response({"error": False, "data": menu})

    @route("/pkfmty/menu/check", methods=["POST"], type="http", auth="user", csrf=False)
    def app_menu_allowed(self):

        data = request.get_json_data()
        path = data.get("path")
        path = path.rstrip("/")

        user = request.env.user

        if not path:
            return request.make_json_response({"allowed": False})
        menus = request.env["pkf.app.menu"].search(domain=[("url", "=", path)], limit=1)

        if not menus:
            return request.make_json_response({"allowed": False})

        allowed = any(
            (not m.group_ids) or (m.group_ids & user.group_ids) for m in menus
        )
        return request.make_json_response({"allowed": allowed})

    @route(["/app", "/app/<path:path>"], type="http", auth="public", website=True)
    def app_path(self, path=None, **kwargs):
        return request.render("pkf_app.pkf_app_fronted")
