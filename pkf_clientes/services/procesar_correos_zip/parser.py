import io
import json
import zipfile
from pathlib import PurePosixPath
from .models import Cliente, Attachment
from .constants import MIME_TYPES


def parse_metadata_to_client(json_bytes: bytes):
    metadata: dict = json.loads(json_bytes.decode("utf-8"))
    return Cliente(
        codigo_cliente=metadata["CodigoCliente"],
        razon_social=metadata["Cliente"],
        correos=metadata["Correos"],
        attachments=[],
    )


def parse_zip_to_client(file_content: bytes) -> dict[str, Cliente]:
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
                    client = parse_metadata_to_client(archive.read(filename))
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
