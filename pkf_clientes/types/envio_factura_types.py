from typing import List, TypedDict, Literal


class EnvioResponse(TypedDict):
    type: Literal["job", "instant"]
    uid: str


class FileDict(TypedDict):
    filename: str
    content: bytes


class FileAttachDict(TypedDict):
    xml: FileDict
    pdf: FileDict


class MetadataDict(TypedDict):
    serie: str
    folio: str
    files: List[FileDict]


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
    banner: str
    files: List[FileDict]
