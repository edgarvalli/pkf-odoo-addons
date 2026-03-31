from typing import TypedDict, Literal, List
from datetime import datetime
from decimal import Decimal


class DocumentoSaldoRow(TypedDict):
    id_documento: int
    cliente_id: int
    fecha: datetime
    serie: str
    folio: int
    serie_folio: str
    cliente_rfc: str
    cliente_nombre: str
    referencia: str
    observaciones: str
    total: Decimal
    pendiente: Decimal
    uuid: str
    emails: str
    estatus: Literal["vigente", "vencido_60", "vencido"]


class FacturaDict(TypedDict):
    fecha: datetime
    serie_folio: str
    uuid: str
    observaciones: str
    total: Decimal
    pendiente: Decimal
    estatus: Literal["vigente", "vencido_60", "vencido"]


class SaldoCliente(TypedDict):
    id_cliente: int
    razon_social: str
    emails: str
    rfc: str
    facturas: List[FacturaDict]
