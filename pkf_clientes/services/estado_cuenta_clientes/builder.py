from collections import defaultdict

from .utils import fecha_mx
from .repository import EstadoCuentaRepository
from .types import GroupKeysDict, ContextType, FacturaRow, GroupDict
from ...utils.tools import format_money, format_fecha


def get_groups() -> GroupKeysDict:
    """Obtener un listado de grupos en diccionario"""
    BASE_DICT = {
        "color": "#0f3780",
        "order": 1,
        "facturas": [],
        "total": 0,
        "saldopendiente": 0,
    }
    return {
        "vencido": {
            **BASE_DICT,
            "order": 1,
            "title": "Vencido a más de 90 días",
        },
        "vencido60": {
            **BASE_DICT,
            "order": 2,
            "title": "Vencido entre 61 y 90 días",
        },
        "vencido30": {
            **BASE_DICT,
            "order": 3,
            "title": "Vencido entre 31 y 60 días",
        },
        "vigente": {
            **BASE_DICT,
            "order": 4,
            "title": "Al corriente",
        },
    }


def build_context_by_row(cliente: ContextType, row: FacturaRow):
    """Crea el contexto de cada row"""
    groups = get_groups()
    if "facturas_group" not in cliente:
        cliente["facturas_group"] = {}
        cliente["facturas"] = []

        cliente["emails"] = row.get("emails")
        cliente["razonsocial"] = row.get("razonsocial")
        cliente["rfc"] = row.get("rfc")
        cliente["fecha"] = fecha_mx()
        cliente["saldototal"] = 0

    cliente["saldototal"] += row["pendiente"]
    # grupo
    group_key = row["estatus"]

    if not group_key in cliente["facturas_group"]:
        group_base = groups.get(group_key)
        if not group_base:
            return

        cliente["facturas_group"][group_key] = group_base

    group: GroupDict = cliente["facturas_group"].get(group_key)

    if group:
        group["facturas"].append(row)
        group["total"] += row["total"]
        group["saldopendiente"] += row["pendiente"]


def format_context(ctx: ContextType):
    """Se formatea los parametros para el template"""
    ctx["saldototal"] = format_money(ctx["saldototal"])
    facturas: list[GroupDict] = list(ctx.get("facturas_group").values())
    if facturas:
        for fact in facturas:
            fact["total"] = format_money(fact["total"])
            fact["saldopendiente"] = format_money(fact["saldopendiente"])
            fact["facturas"] = [
                {
                    **_ft,
                    "fecha": format_fecha(_ft["fecha"]),
                    "total": format_money(_ft["total"]),
                    "pendiente": format_money(_ft["pendiente"]),
                }
                for _ft in fact["facturas"]
            ]
    ctx["facturas"] = facturas


def build_context(
    repo: EstadoCuentaRepository,
    idcliente: int = None,
    emails: list[str] = None,
    include_vigentes=False,
) -> list[ContextType]:
    rows = repo.get_facturas(idcliente, include_vigentes)
    ctx_dict: dict[int, ContextType] = defaultdict(dict)

    for row in rows:
        key = row["idcliente"]
        cliente = ctx_dict[key]
        if emails:
            cliente["emails"] = ",".join(emails)

        build_context_by_row(cliente, row)

    ctx_list = list(ctx_dict.values())

    for ctx in ctx_list:
        format_context(ctx)

    return ctx_list
