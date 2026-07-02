import base64
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from odoo.addons.base.models.ir_attachment import IrAttachment

from ..mailer.models import Attachment


class AttachmentMapper:

    @staticmethod
    def get_types(mimetype: str = None):
        mimetype = mimetype or "application/octet-stream"
        parts = mimetype.split("/")
        maintype = parts[0]
        subtype = parts[1] if len(parts) > 1 else "octet-stream"
        return maintype, subtype

    @staticmethod
    def map(attachment_ids: "IrAttachment") -> list[Attachment]:
        items = []
        for item in attachment_ids:
            maintype, subtype = AttachmentMapper.get_types(item.mimetype)

            items.append(
                Attachment(
                    filename=item.name,
                    data=base64.b64decode(item.datas),
                    maintype=maintype,
                    subtype=subtype,
                )
            )

        return items
