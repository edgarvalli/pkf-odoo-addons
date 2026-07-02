from dataclasses import dataclass, field


@dataclass
class Attachment:
    data: bytes
    maintype: str
    subtype: str
    filename: str


@dataclass(slots=True, frozen=True)
class MailAttachment:
    filename: str
    data: bytes
    maintype: str
    subtype: str


@dataclass(slots=True)
class MailData:

    subject: str
    body_html: str

    to: list[str] = field(default_factory=list)
    cc: list[str] = field(default_factory=list)
    bcc: list[str] = field(default_factory=list)
    reply_to: list[str] = field(default_factory=list)

    attachments: list[MailAttachment] = field(default_factory=list)
