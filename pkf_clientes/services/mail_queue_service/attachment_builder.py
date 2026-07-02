import base64
from pathlib import Path
from zipfile import ZipFile
from odoo.api import Environment
from odoo.tools.mimetypes import guess_mimetype

from .models import Attachment
from .utils import build_temppath
from .models import AttachmentContext, IrAttachment
from .context_builder import ContextBuilder


class AttachmentBuilder:

    def __init__(self, env: Environment):
        self.env = env

    @staticmethod
    def build_mail_attachments(
        attachment_ids: list["IrAttachment"],
    ) -> dict[str, AttachmentContext]:

        attachments = []

        for attach in attachment_ids:

            mimetype = attach.mimetype or "application/octet-stream"

            parts = mimetype.split("/")

            maintype = parts[0]

            subtype = parts[1] if len(parts) > 1 else "octet-stream"

            attachments.append(
                Attachment(
                    data=base64.b64decode(attach.datas),
                    maintype=maintype,
                    subtype=subtype,
                    filename=attach.name,
                )
            )

        return attachments

    def build(self, zip_bytes: bytes):

        self.zip_path = build_temppath(zip_bytes)

        with ZipFile(str(self.zip_path), "r") as z:

            grouped: dict[str, AttachmentContext] = {}

            for filename in z.namelist():

                if filename.endswith("/") or "__MACOSX" in filename:
                    continue

                path = Path(filename)

                ext = path.suffix.lower().lstrip(".")

                if ext not in ["xml", "pdf"]:
                    continue

                key = path.stem

                if key not in grouped:

                    grouped[key] = AttachmentContext(attachment_ids=[], context=None)

                cursor = grouped[key]

                datas = z.read(filename)

                if ext == "xml":

                    ctx = ContextBuilder.build_invoice(datas)

                    cursor.context = ctx

                attach_id = self.env["ir.attachment"].create(
                    {
                        "type": "binary",
                        "datas": base64.b64encode(datas).decode("utf-8"),
                        "name": path.name,
                        "mimetype": guess_mimetype(datas),
                        "res_model": "pkf.email.queue",
                    }
                )

                if attach_id:
                    cursor.attachment_ids.append(attach_id.id)

            return grouped

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        if self.zip_path and self.zip_path.exists():
            self.zip_path.unlink()
