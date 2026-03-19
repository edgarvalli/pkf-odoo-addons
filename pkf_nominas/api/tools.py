from odoo import http
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

    return http.route(url, type=type, auth=auth, methods=methods, **kwargs)
