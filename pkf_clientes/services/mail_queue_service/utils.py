import tempfile
from pathlib import Path
from jinja2 import Template
from odoo.api import Environment
from odoo.fields import Datetime
from odoo.modules import get_module_path

from .types import LogDict
from .models import Context


def logger(env: Environment, log: LogDict):
    env["pkf.envios.logs"].create(
        {
            "uuid": log.get("uid"),
            "fecha": Datetime.now(),
            "cliente": log.get("client", "System"),
            "rfc": log.get("rfc", "XAXX010101000"),
            "estatus": log.get("status", "ok"),
            "evento": log.get("event", ""),
        }
    )


def build_temppath(zip_bytes: bytes):

    with tempfile.NamedTemporaryFile(delete=False) as f:
        f.write(zip_bytes)
        return Path(f.name)


def render_html(template_content: str, values: dict):
    t = Template(template_content)
    return t.render(values)


def render_body(ctx: Context):

    template_path = (
        Path(get_module_path("pkf_clientes"))
        / "templates"
        / "email_queue_template.html"
    )

    if not template_path.exists():
        return "Se envían las facturas anexas"

    template_content = template_path.read_text(encoding="utf-8")

    total_attachments = len(ctx.attachment_ids)

    values = {
        "msg": (
            "le hacemos llegar sus facturas"
            if total_attachments > 1
            else "le hacemos llegar su factura"
        ),
        "client": ctx.razon_social or "Cliente",
    }

    return render_html(template_content, values)
