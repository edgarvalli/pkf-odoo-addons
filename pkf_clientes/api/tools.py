from odoo.http import route, request
from typing import Literal, List


def api_route(
    path: str,
    type: Literal["http", "jsonrpc"] = "jsonrpc",
    auth: Literal["user", "public"] = "user",
    methods: List[Literal["GET", "POST", "PUT", "DELETE"]] = None,
    **kwargs,
):
    if methods is None:
        methods = ["POST"]

    url = f"/pkfmty/api/v1{path if path.startswith('/') else f'/{path}'}"

    return route(url, type=type, auth=auth, methods=methods, **kwargs)


def api_ok(data=None, message="ok"):
    return request.make_json_response(
        {"error": False, "message": message, "data": data}
    )


def api_error(message="Error", data=None):
    return request.make_json_response({"error": True, "message": message, "data": data})
