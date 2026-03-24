import pytz
from typing import List, Dict
from datetime import datetime
from .tools import format_money, get_img_b64

grupos = {
    "vencido": {
        "title": "Vencido",
        "color": "#ae2821",
        "order": 1,
        "facturas": [],
        "total": 0,
        "total_pendiente": 0,
    },
    "vencido_90": {
        "title": "Vencido a 90 días",
        "color": "#d24e12",
        "order": 2,
        "facturas": [],
        "total": 0,
        "total_pendiente": 0,
    },
    "vencido_60": {
        "title": "Vencido a 60 días",
        "color": "#e1ab16",
        "order": 3,
        "facturas": [],
        "total": 0,
        "total_pendiente": 0,
    },
    "vigente": {
        "title": "Vigente",
        "color": "#388e27",
        "order": 4,
        "facturas": [],
        "total": 0,
        "total_pendiente": 0,
    },
}


def fecha_metadata():
    """Entrega las fechas para el template"""
    timezone = pytz.timezone("America/Monterrey")
    today = datetime.now(tz=timezone)
    return {
        "fecha": today.strftime("%d de %B de %Y"),
        "titulo_header": f"Estado de Cuenta %B {today.year}",
    }


def format_fecha(fecha: datetime):
    if not fecha:
        return ""
    return fecha.strftime("%d/%m/%Y")


def calcular_totales(saldo: List[Dict]):
    """Calcula cuanto esta pendiente y el saldo total"""
    total = sum(inv.get("total", 0) for inv in saldo)
    pendiente = sum(inv.get("pendiente", 0) for inv in saldo)

    return {
        "saldo_total": format_money(total),
        "pendiente_total": format_money(pendiente),
    }


def map_groups(data: Dict):
    groups = sorted(data.values(), key=lambda x: x["order"])
    groups = [
        {
            **g,
            "total": format_money(g["total"]),
            "total_pendiente": format_money(g["total_pendiente"]),
        }
        for g in groups
    ]

    return groups


def formatear_saldo(facturas: List[Dict]):
    """Se formatea el saldo a 90,60 dias vencidos y las vigentes"""

    for inv in facturas:
        key = inv.get("estatus")
        grupo = grupos.get(key)
        if not grupo:
            continue

        total = float(inv.get("total") or 0)
        total_pendiente = float(inv.get("pendiente") or 0)

        grupo["facturas"].append(
            {
                **inv,
                "fecha": format_fecha(inv.get("fecha")),
                "total": format_money(total),
                "pendiente": format_money(total_pendiente),
            }
        )
        grupo["total"] += total
        grupo["total_pendiente"] += total_pendiente

    return map_groups(grupos)


def build_context(cliente: Dict):

    facturas = cliente.pop("facturas", [])
    fechas = fecha_metadata()

    return {
        **cliente,
        **fechas,
        "facturas": formatear_saldo(facturas),
        "metadata": calcular_totales(facturas),
        "logo": get_img_b64("logo.png"),
        "banner": get_img_b64("banner.png"),
    }
