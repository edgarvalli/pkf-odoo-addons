from odoo.models import BaseModel
from ..mailer.models import MailData
from .attachment_mapper import AttachmentMapper


class EmailMapper:

    @staticmethod
    def normalize(value) -> list[str]:

        if not value:
            return []

        if isinstance(value, str):
            return [x.strip() for x in value.split(",") if x.strip()]

        return [str(x).strip() for x in value if str(x).strip()]

    @classmethod
    def from_queue(cls, email: BaseModel):

        return MailData(
            subject=email.subject,
            body_html=email.body_html,
            to=cls.normalize(email.email_to),
            cc=cls.normalize(email.email_cc),
            bcc=cls.normalize(email.email_bcc),
            reply_to=cls.normalize(email.email_reply_to),
            attachments=AttachmentMapper.map(email.attachment_ids),
        )
