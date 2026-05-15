from typing import TypedDict


class EmailDict(TypedDict):
    idcliente: int
    uuid: str
    emails: str


class ContextDict(TypedDict):
    idcliente: int
    uuid: str
    rfc: str
    razon_social: str
    serie: str
    folio: str
    subject: str
    emails: str
    attachment_ids: list[int]


class AttachmentDict(TypedDict):
    attachment_ids: list[int]
    context: ContextDict


class LogDic(TypedDict):
    uid: int
    client: str
    rfc: str
    status: str
    event: str
