from dataclasses import dataclass


@dataclass
class Attachment:
    name: str
    stem: str
    mimetype: str
    datas: bytes


@dataclass
class Cliente:
    codigo_cliente: str
    razon_social: str
    correos: str
    attachments: list[Attachment]
