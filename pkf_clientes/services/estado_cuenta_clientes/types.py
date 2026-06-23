from typing import TypedDict, Literal
from datetime import date


class FacturaRow(TypedDict):
    iddocumento: int
    idcliente: int
    serie: str
    folio: int
    seriefolio: str
    fecha: date
    fechavencimiento: date
    diasvencidos: int
    razonsocial: str
    rfc: str
    emails: str
    observaciones: str
    referencia: str
    uuid: str
    diascredito: int
    estatus: Literal["vigente", "vencido60", "vencido"]
    total: float
    pendiente: float


class GroupDict(TypedDict):
    title: str
    color: str
    order: int
    total: float
    saldopendiente: float
    facturas: list


class GroupKeysDict(TypedDict):
    vencido: GroupDict
    vencido60: GroupDict
    vigente: GroupDict


class MetadataDict(TypedDict):
    fecha: str
    titulo_header: str


class ContextType(TypedDict):
    id: int
    codigo: str
    razonsocial: str
    rfc: str
    emails: str
    saldototal: float
    fecha: str
    facturas_group: GroupKeysDict
    facturas: list[GroupDict]
