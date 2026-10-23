import uuid
from collections import defaultdict

from .models import Factura
from .utils import fecha_mx, format_money
from .repository import EstadoCuentaRepository
from .types import GroupKeysDict, ContextType, GroupDict


class ContextBuilder:

    def __init__(self, repo: EstadoCuentaRepository):
        self.uid = str(uuid.uuid4())
        self.repo = repo

    def _group(self, title: str, order: int):
        return {
            "title": title,
            "order": order,
            "color": "#0f3780",
            "facturas": [],
            "total": 0.0,
            "saldopendiente": 0.0,
        }

    def _get_groups(self) -> dict[str, GroupKeysDict]:
        return {
            "vencido": self._group("Vencido a más de 90 días", 1),
            "vencida60": self._group("Vencido entre 61 y 90 días", 2),
            "vencida30": self._group("Vencido entre 31 y 60 días", 3),
            "vigente": self._group("Al corriente", 4),
        }

    def _add_row_to_context(self, cliente: ContextType, row: Factura):
        groups = self._get_groups()

        if "facturas_group" not in cliente:
            cliente["facturas_group"] = {}
            cliente["facturas"] = []
            cliente["emails"] = row.emails
            cliente["razonsocial"] = row.cliente_name
            cliente["rfc"] = row.cliente_rfc
            cliente["fecha"] = fecha_mx()
            cliente["saldototal"] = 0.0

        cliente["saldototal"] += row.saldo_pendiente
        group_key = row.estatus

        if group_key not in cliente["facturas_group"]:
            group_base = groups.get(group_key)
            if not group_base:
                return
            cliente["facturas_group"][group_key] = group_base

        group: GroupDict = cliente["facturas_group"].get(group_key)

        if group:
            group["facturas"].append(row.to_dict())
            group["total"] += row.total
            group["saldopendiente"] += row.saldo_pendiente

    def _finalize_context(self, ctx: ContextType):
        ctx["saldototal"] = format_money(ctx["saldototal"])
        ctx["uid"] = self.uid
        facturas = list(ctx.get("facturas_group", {}).values())
        if facturas:
            for fact in facturas:
                fact["total"] = format_money(fact["total"])
                fact["saldopendiente"] = format_money(fact["saldopendiente"])
                fact["facturas"] = [
                    {
                        **_ft,
                        "fecha": _ft["fecha"],
                        "total": format_money(_ft["total"]),
                        "pendiente": format_money(_ft["saldo_pendiente"]),
                    }
                    for _ft in fact["facturas"]
                ]
        ctx["facturas"] = facturas

    def build(
        self, facturas: list[Factura], emails: list[str] = None
    ) -> list[ContextType]:
        ctx_dict: dict[int, ContextType] = defaultdict(ContextType)
        for f in facturas:
            key = f.cliente_id
            cliente = ctx_dict[key]
            if emails:
                cliente["emails"] = ",".join(emails)
            self._add_row_to_context(cliente, f)

        ctx_list = list(ctx_dict.values())
        for ctx in ctx_list:
            self._finalize_context(ctx)
        return ctx_list
