import base64, mimetypes
from pathlib import Path
from datetime import datetime, timedelta
from odoo.modules.module import get_module_path


def get_img_b64(image_name: str = "logo.png"):
    path = Path(get_module_path("pkf_clientes")) / f"static/img/{image_name}"

    if not path.exists() or not path.is_file():
        return None

    mime_type, _ = mimetypes.guess_type(path)

    # fallback por si no detecta MIME
    if not mime_type:
        mime_type = "application/octet-stream"

    with open(path, "rb") as f:
        content = f.read()
        content_str = base64.b64encode(content).decode("utf-8")

    return f"data:{mime_type};base64,{content_str}"


def format_money(value):
    return f"{float(value or 0):,.2f}"


def format_fecha(fecha: datetime):
    if not fecha:
        return ""
    return fecha.strftime("%d/%m/%Y")


def next_5_min():
    now = datetime.now()

    # minutos que faltan para el siguiente múltiplo de 5
    minutes_to_add = 5 - (now.minute % 5)

    # si ya estás justo en múltiplo de 5, saltas al siguiente
    if minutes_to_add == 0:
        minutes_to_add = 5

    future = now + timedelta(minutes=minutes_to_add)

    # opcional: limpiar segundos
    future = future.replace(second=0, microsecond=0)

    return future
