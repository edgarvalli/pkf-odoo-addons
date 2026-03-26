from typing import List, TypedDict, Literal
from datetime import datetime


class GroupDict(TypedDict):
    title: str
    color: str
    order: int
    total: float
    total_pendiente: float
    facturas: List


class GroupKeysDict(TypedDict):
    vencido: GroupDict
    vencido_60: GroupDict
    vencido_90: GroupDict
    vigente: GroupDict


class MetadataDict(TypedDict):
    fecha: str
    titulo_header: str


class TotalesDict(TypedDict):
    saldo_total: str
    pendiente_total: str


class Factura(TypedDict):
    id_documento: int
    serie: str
    folio: int
    serie_folio: str
    fecha: datetime
    fecha_vencimiento: datetime
    observaciones: str
    referencia: str
    uuid: str
    estatus: Literal["vigente", "vencido_60", "vencido_90", "vencido"]
    total: float
    pendiente: float


class ContextType(TypedDict):
    id: int
    codigo: str
    razon_social: str
    rfc: str
    curp: str
    emails: str
    logo: str
    banner: str
    factutas: List[Factura]
