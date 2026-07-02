from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from odoo.addons.base.models.ir_attachment import IrAttachment

from dataclasses import dataclass, field


@dataclass(slots=True)
class Log:
    uid: str
    client: str
    rfc: str = "XAXX010101000"
    status: str = "ok"
    event: str = ""


@dataclass(slots=True)
class Email:
    idcliente: int
    uuid: str
    emails: str


@dataclass(slots=True)
class Context:
    uuid: str
    rfc: str
    razon_social: str
    serie: str
    folio: str

    idcliente: int = 0
    emails: str = ""
    attachment_ids: list[int] = field(default_factory=list)

    @property
    def subject(self) -> str:
        return f"[INV] Factura CFDI 4.0 {self.serie}{self.folio}"


@dataclass
class Attachment:
    data: bytes
    maintype: str
    subtype: str
    filename: str


@dataclass(slots=True)
class AttachmentContext:
    attachment_ids: list[int] = field(default_factory=list)
    context: Context | None = None
