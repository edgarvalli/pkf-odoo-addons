from datetime import datetime
from typing import Literal
from dataclasses import dataclass, asdict

from ..models.objects import Cliente, Grupo

Estatus = Literal["vencido", "vencida60", "vencida30", "vigente"]


@dataclass
class Factura:
    id: int
    fecha: datetime
    serie: str
    folio: int
    concepto_id: int
    referencia: str
    observaciones: str
    diasvencidos: int
    total: float
    saldo_pendiente: float
    uuid: str
    emails: str
    estatus: Estatus
    cliente: Cliente | None = None
    grupo: Grupo | None = None

    def __post_init__(self):
        self.total = float(self.total)
        self.saldo_pendiente = float(self.saldo_pendiente)

    @classmethod
    def from_dict(cls, values: dict) -> "Factura":
        cliente = Cliente(
            id=int(values.pop("cliente_id", "0") or 0),
            codigo=values.pop("cliente_codigo", ""),
            nombre=values.pop("cliente_nombre", ""),
            rfc=values.pop("cliente_rfc", ""),
        )

        grupo = Grupo(
            id=int(values.pop("grupo_id", "0") or 0),
            codigo=values.pop("grupo_codigo", ""),
            nombre=values.pop("grupo_nombre", ""),
        )

        return cls(**{**values.copy(), "cliente": cliente, "grupo": grupo})

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class SaldoFactura:
    cliente: Cliente
    grupo: Grupo
    saldo_total: float
    saldo_vigente: float
    saldo_vencido30: float
    saldo_vencido60: float
    saldo_vencido: float
    saldo_pendiente: float

    def to_dict(self):
        return asdict(self)
