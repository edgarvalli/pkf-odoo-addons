import io
import json
import base64
import zipfile
from odoo.api import Environment
from pathlib import PurePosixPath
from dataclasses import dataclass

MIME_TYPES = {
    ".pdf": "application/pdf",
    ".xml": "application/xml",
}


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


class ProcesarZipContpaqi:
    """
    Clase para procesar el zip que se genera de la aplicacion
    Comercial para mandar los correos.
    """

    def __init__(self, env: Environment):
        self.env = env

    def _get_mail_server_id(self):
        return self.env["ir.mail_server"].search(
            [("smtp_user", "=", "facturacion@pkfmty.com")], limit=1
        )

    def _metadata_factory(self, datas: bytes):
        metadata: dict = json.loads(datas.decode("utf-8"))
        return Cliente(
            codigo_cliente=metadata["CodigoCliente"],
            razon_social=metadata["Cliente"],
            correos=metadata["Correos"],
            attachments=[],
        )

    def _create_attachments(self, attachments: list[Attachment]):
        AttachmentModel = self.env["ir.attachment"].sudo()

        attachment_ids = []

        for attachment in attachments:
            record = AttachmentModel.create(
                {
                    "name": attachment.name,
                    "type": "binary",
                    "datas": base64.b64encode(attachment.datas),
                    "mimetype": attachment.mimetype,
                    "res_model": "mail.mail",
                }
            )

            attachment_ids.append(record.id)

        return [(6, 0, attachment_ids)] if attachment_ids else []

    def _unpackage_zip(self, file_content: bytes) -> dict[str, Cliente]:
        filezip = io.BytesIO(file_content)
        docs: dict[str, Cliente] = {}

        with zipfile.ZipFile(filezip, "r") as archive:

            folders: dict[str, list[str]] = {}

            for filename in archive.namelist():
                path = PurePosixPath(filename)

                if filename.endswith("/"):
                    continue

                folder = str(path.parent)
                folders.setdefault(folder, []).append(filename)

            for filenames in folders.values():

                client: Cliente | None = None

                # Primero buscamos el JSON
                for filename in filenames:
                    path = PurePosixPath(filename)

                    if path.suffix.lower() == ".json":
                        client = self._metadata_factory(archive.read(filename))
                        break

                if client is None:
                    continue

                # Después procesamos PDF/XML
                for filename in filenames:
                    path = PurePosixPath(filename)
                    extension = path.suffix.lower()

                    if extension not in MIME_TYPES:
                        continue

                    client.attachments.append(
                        Attachment(
                            name=path.name,
                            stem=path.stem,
                            mimetype=MIME_TYPES[extension],
                            datas=archive.read(filename),
                        )
                    )

                docs.setdefault(
                    client.codigo_cliente,
                    client,
                )

        return docs

    def _schedule_email(
        self, datas: dict[str, Cliente], email_cc: str, document_type: str
    ):
        template_name = (
            "envio_pago_template"
            if document_type == "payment"
            else "envio_factura_template"
        )
        template = self.env.ref(f"pkf_clientes.{template_name}").sudo()

        mailid = self._get_mail_server_id()

        for client in datas.values():
            email_values = {
                "email_from": "PKF Monterrey <no-reply@pkfmty.com>",
                "email_to": client.correos,
                "email_cc": email_cc,
                "isbatch": True,
                "state": "cancel",
                "attachment_ids": self._create_attachments(client.attachments),
            }

            if mailid:
                email_values["mail_server_id"] = mailid.id

            subject = ", ".join(
                [a.stem for a in client.attachments if a.mimetype == MIME_TYPES[".pdf"]]
            )

            ctx = {
                "subject": subject,
                "documentos": client.attachments,
                "razon_social": client.razon_social,
            }

            template.with_context(ctx).send_mail(
                res_id=self.env.user.partner_id.id,
                force_send=False,
                email_values=email_values,
            )

    def procesar(self, file_content: bytes, email_cc: str, document_type: str):
        datas = self._unpackage_zip(file_content)
        self._schedule_email(datas, email_cc, document_type)
        return True
