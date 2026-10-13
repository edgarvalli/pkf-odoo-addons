from datetime import datetime
from typing import Literal
from dataclasses import dataclass, asdict


@dataclass
class Factura:
    id: int
    fecha: datetime
    serie: str
    folio: int
    cliente_id: int
    cliente_codigo: str
    cliente_name: str
    cliente_rfc: str
    grupo_id: int
    grupo_name: str
    grupo_codigo: str
    concepto_id: int
    referencia: str
    observaciones: str
    diasvencidos: int
    total: float
    saldo_pendiente: float
    uuid: str
    emails: str
    estatus: Literal["vigente", "vencida30", "vencida60", "vencida"]

    def __post_init__(self):
        self.total = float(self.total)
        self.saldo_pendiente = float(self.saldo_pendiente)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "fecha": self.fecha.strftime("%Y-%m-%d %H:%M:%S"),
            "serie": self.serie,
            "folio": self.folio,
            "cliente_id": self.cliente_id,
            "cliente_codigo": self.cliente_codigo,
            "cliente_name": self.cliente_name,
            "cliente_rfc": self.cliente_rfc,
            "grupo_id": self.grupo_id,
            "grupo_name": self.grupo_name,
            "grupo_codigo": self.grupo_codigo,
            "concepto_id": self.concepto_id,
            "referencia": self.referencia,
            "observaciones": self.observaciones,
            "diasvencidos": self.diasvencidos,
            "total": self.total,
            "saldo_pendiente": self.saldo_pendiente,
        }


@dataclass
class SaldoFactura:
    cliente_id: str
    cliente_codigo: str
    cliente_name: str
    cliente_rfc: str
    grupo_id: int
    grupo_name: str
    grupo_codigo: str
    saldo_total: float
    saldo_vigente: float
    saldo_vencido30: float
    saldo_vencido60: float
    saldo_vencido: float
    saldo_pendiente: float

    def to_dict(self):
        return asdict(self)
