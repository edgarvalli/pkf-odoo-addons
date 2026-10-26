from dataclasses import dataclass, field, asdict
from datetime import date, datetime

from .factura import Factura, Estatus
from ..constants.estatus import ESTATUS
from ..utils.numbers import formato_moneda


@dataclass
class Group:
    estatus: Estatus = "vigente"
    color: str = "#0f3780"
    facturas: list[Factura] = field(default_factory=list)

    @property
    def title(self) -> str:
        return ESTATUS.get(self.estatus, {}).get("title", "")

    @property
    def order(self) -> int:
        return ESTATUS.get(self.estatus, {}).get("order", 0)

    @property
    def saldo_pendiente(self) -> float:
        return sum(f.saldo_pendiente for f in self.facturas)

    @property
    def total(self) -> float:
        return sum(f.total for f in self.facturas)

    def to_dict(self) -> dict:
        data = asdict(self)

        data.update(
            {
                "title": self.title,
                "order": self.order,
                "saldo_pendiente": formato_moneda(self.saldo_pendiente),
                "total": formato_moneda(self.total),
                "facturas": [self._factura_to_dict(f) for f in self.facturas],
            }
        )

        return data

    @staticmethod
    def _factura_to_dict(factura: Factura) -> dict:
        data = asdict(factura)

        fecha = factura.fecha
        if isinstance(fecha, (date, datetime)):
            data["fecha"] = fecha.strftime("%d/%m/%Y")

        data["total"] = formato_moneda(factura.total)
        data["saldo_pendiente"] = formato_moneda(factura.saldo_pendiente)

        return data


@dataclass
class Context:
    id: int = 0
    uid: str = ""
    codigo: str = ""
    razonsocial: str = ""
    rfc: str = ""
    emails: str = ""
    fecha: str = ""
    facturas_group: dict[Estatus, Group] = field(default_factory=dict)
    mail_server_id: int = 0

    @property
    def facturas(self) -> list[Group]:
        return list(self.facturas_group.values())

    @property
    def saldo_total(self) -> float:
        return sum(group.total for group in self.facturas)

    @property
    def saldo_pendiente(self) -> float:
        return sum(group.saldo_pendiente for group in self.facturas)

    def to_dict(self) -> dict:
        data = asdict(self)

        data["facturas"] = [group.to_dict() for group in self.facturas]
        data["saldo_total"] = formato_moneda(self.saldo_total)
        data["saldo_pendiente"] = formato_moneda(self.saldo_pendiente)

        data.pop("facturas_group")

        return data
