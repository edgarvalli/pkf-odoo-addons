import uuid
from collections import defaultdict

from .utils import fecha_mx
from .repository import EstadoCuentaRepository
from .types import GroupKeysDict, ContextType, FacturaRow, GroupDict
from ...utils.tools import format_money, format_fecha


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
            "total": 0,
            "saldopendiente": 0,
        }

    def _get_groups(self) -> GroupKeysDict:
        """Obtener un listado de grupos en diccionario"""
        return {
            "vencido": self._group("Vencido a más de 90 días", 1),
            "vencido60": self._group("Vencido entre 61 y 90 días", 2),
            "vencido30": self._group("Vencido entre 31 y 60 días", 3),
            "vigente": self._group("Al corriente", 4),
        }

    def _add_row_to_context(self, cliente: ContextType, row: FacturaRow):
        """Crea el contexto de cada row"""

        groups = self._get_groups()

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

    def _finalize_context(self, ctx: ContextType):
        """Se formatea los parametros para el template"""
        ctx["saldototal"] = format_money(ctx["saldototal"])
        ctx["uid"] = self.uid
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

    def build(
        self,
        idcliente: int = None,
        emails: list[str] = None,
        include_vigentes: bool = False,
    ) -> list[ContextType]:

        rows = self.repo.get_facturas(idcliente, include_vigentes)
        ctx_dict: dict[int, ContextType] = defaultdict(dict)
        for row in rows:
            key = row["idcliente"]
            cliente = ctx_dict[key]
            if emails:
                cliente["emails"] = ",".join(emails)

            self._add_row_to_context(cliente, row)

        ctx_list = list(ctx_dict.values())

        for ctx in ctx_list:
            self._finalize_context(ctx)

        return ctx_list
