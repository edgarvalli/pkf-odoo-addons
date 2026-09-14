from datetime import datetime
from typing import Literal
from dataclasses import dataclass, asdict


@dataclass
class Factura:
    id: int
    fecha: datetime
    serie: str
    folio: int
    cliente_id: str
    cliente_codigo: str
    cliente_name: str
    cliente_rfc: str
    grupo_id: int
    grupo_name: str
    grupo_codigo: str
    concepto_id: int
    total: float
    saldo_pendiente: float
    uuid: str
    emails: str

    @property
    def estatus(self) -> Literal["vigente", "vencida30", "vencida60", "vencida"]:
        today = datetime.now().date()
        days = (today - self.fecha.date()).days

        if days <= 0:
            return "vigente"
        if days <= 31:
            return "vigente"
        if days <= 60:
            return "vencida30"
        if days <= 90:
            return "vencida60"
        else:
            return "vencida"

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
            "total": self.total,
            "saldo_pendiente": self.saldo_pendiente,
            "uuid": self.uuid,
            "emails": self.emails,
            "estatus": self.estatus,
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
