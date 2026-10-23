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
    estatus: Literal["vigente", "vencido30", "vencido60", "vencido"]
    total: float
    pendiente: float


class FacturaDict(TypedDict):
    id: int
    fecha: str  # formato "%Y-%m-%d %H:%M:%S"
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
    total: float
    saldo_pendiente: float
    uuid: str
    emails: str
    estatus: Literal["vigente", "vencida30", "vencida60", "vencida"]


class GroupDict(TypedDict):
    title: str
    color: str
    order: int
    total: float
    saldopendiente: float
    facturas: list[FacturaDict]


class GroupKeysDict(TypedDict):
    vencido: GroupDict
    vencido60: GroupDict
    vigente: GroupDict


class MetadataDict(TypedDict):
    fecha: str
    titulo_header: str


class ContextType(TypedDict):
    id: int
    uid: str
    codigo: str
    razonsocial: str
    rfc: str
    emails: str
    saldototal: float
    fecha: str
    facturas_group: dict[str, GroupDict]
    facturas: list[GroupDict]
    mail_server_id: int
