from lxml import etree
from pathlib import Path
from zipfile import ZipFile
from odoo.models import AbstractModel
from typing import List, Literal
import io, base64, time, uuid, json
from datetime import datetime, timedelta
from dataclasses import field
from ..utils.tools import get_img_b64
from odoo.orm.environments import Environment
from werkzeug.datastructures import FileStorage
from ..types.envio_factura_types import FileDict, MetadataDict, ContextDict


class EnvioFacturasClienteService(AbstractModel):
    _name = "pkf.envio.facturas.service"
    file: FileStorage
    uid: str = field(default_factory=lambda: str(uuid.uuid4()))

    def __init__(self, env, ids, prefetch_ids, file: FileStorage):
        super().__init__(env, ids, prefetch_ids)
        self.file = file

    def _set_log(self, **kwargs):
        self.env["pkf.envios.logs"].create(
            {
                "uuid": self.uid,
                "fecha": datetime.now(),
                "cliente": kwargs.get("cliente", "System"),
                "rfc": kwargs.get("rfc", "XAXX01010100"),
                "estatus": kwargs.get("estatus", "ok"),
                "evento": kwargs.get("evento", ""),
            }
        )

    def _get_total_files(self) -> int:
        self.file.stream.seek(0)
        buffer = io.BytesIO(self.file.read())

        total = 0

        with ZipFile(buffer, "r") as z:
            for name in z.namelist():
                if name.endswith("/"):
                    continue

                ext = Path(name).suffix.lower()
                if ext in [".xml", ".pdf"]:
                    total += 1

        return total // 2

    def _get_files_from_zip(self) -> List[FileDict]:
        self.file.stream.seek(0)
        buffer = io.BytesIO(self.file.read())
        files = {}

        with ZipFile(buffer, "r") as z:
            for filename in z.namelist():

                if filename.endswith("/"):
                    continue

                path = Path(filename)
                fkey = path.stem.strip()
                ext = path.suffix.lower().lstrip(".")

                if ext not in ["xml", "pdf"]:
                    continue

                content = z.read(filename)

                if fkey not in files:
                    files[fkey] = {"xml": None, "pdf": None}

                files[fkey][ext] = {"filename": path.name, "content": content}

        return list(files.values())

    def _get_metadata_factura(self, xml_bytes: bytes) -> MetadataDict:
        if not xml_bytes:
            return {}

        root = etree.fromstring(xml_bytes)

        ns = {"cfdi": "http://www.sat.gob.mx/cfd/4"}

        serie = root.get("Serie")
        folio = root.get("Folio")

        receptor = root.find("cfdi:Receptor", namespaces=ns)
        rfc_receptor = receptor.get("Rfc") if receptor is not None else None

        return {"rfc": rfc_receptor, "serie": serie, "folio": folio}

    def _attach_files(self, files: List[int]):
        attach = self.env["ir.attachment"]

        ids = []

        for f in files:
            if not f.get("content"):
                continue

            rec = attach.create(
                {
                    "name": f.get("filename"),
                    "datas": base64.b64encode(f.get("content")),
                    "type": "binary",
                }
            )

            ids.append(rec.id)

        return ids

    def _format_cliente(self, data: List[MetadataDict]) -> List[ContextDict]:
        comercial = self.env["ev.contpaqi.comercial"]
        clientes = {}

        logo = get_img_b64("logo.png")
        banner = get_img_b64("banner.png")

        for item in data:

            fkey = "facturas"
            rfc = item.get("rfc")

            if not rfc:
                continue

            cliente = comercial.buscar_cliente_rfc(rfc)

            if not cliente:
                continue

            cursor = clientes.get(rfc)

            if not cursor:

                facturas = cliente.get(fkey)

                if not facturas:
                    cliente.setdefault(fkey, [])

                cliente["logo"] = logo
                cliente["banner"] = banner
                clientes.setdefault(rfc, cliente)

                cursor = clientes.get(rfc)

            cursor[fkey].append({**item})
            cursor = cliente

        return list(clientes.values())

    def _build_context(self) -> List[ContextDict]:
        attachments = self._get_files_from_zip()
        data = []

        for a in attachments:
            xml_file = a.get("xml") or {}
            xml_content = xml_file.get("content")
            data.append({"files": a, **self._get_metadata_factura(xml_content)})

        return self._format_cliente(data)

    def _send_bitacora(self, start: datetime, end: datetime):
        attachment = self.env["pkf.envios.logs"].generar_bitacora_excel(
            self.uid, startdate=start, enddate=end
        )
        mail = self.env["mail.mail"].create(
            {
                "subject": f"Bitácora proceso {self.uid}",
                "body_html": f"""
                <p>Se ha completado el proceso.</p>
                <p>UUID: {self.uid}</p>
                <p>Se adjunta la bitácora en Excel.</p>
            """,
                "email_to": self.env.user.email,
                "email_from": "PKF Monterrey <no-reply@pkfmty.com>",
                "attachment_ids": [(6, 0, [attachment.id])],
            }
        )

        mail.send()

    def _job_background(
        self, ctx_list: List[ContextDict], send_to_client: bool = False
    ):

        data = json.dumps({"ctx_list": ctx_list, "send_to_client": send_to_client})
        self.env["ir.cron"].create(
            {
                "name": f"Envio de facturas PKF {self.uid}",
                "model_id": self.env["ir.model"]._get(self._name).id,
                "state": "code",
                "code": f"model.envio_facturas('{data}')",
                "nextcall": datetime.now() + timedelta(seconds=5),
                "numbercall": 1,
                "active": True,
            }
        )

    def envio_facturas(self, ctx_list: List[ContextDict], send_to_client: bool = False):
        sdate = datetime.now()
        for ctx in ctx_list:
            cliente = ctx.get("razon_social") or "System"
            self.enviar(ctx, send_to_client=send_to_client)
            self._set_log(
                cliente=ctx.get("rfc"),
                rfc=ctx.get("rfc"),
                evento=f"Se programo el envio al cliente {cliente}.",
            )

        self.env["pkf.envios.logs"].send_bitacora(
            uid=self.uid, start=sdate, end=datetime.now()
        )
        return

    def enviar(self, ctx: ContextDict, **kwargs):
        template = self.env.ref("pkf_clientes.envio_factura_template").sudo()

        subject = []
        files = []
        facturas: List[MetadataDict] = ctx.get("facturas") or []

        send_to_client = kwargs.get("send_to_client")
        user_email = self.env.user.email

        for f in facturas:
            serie = f.get("serie") or ""
            folio = f.get("folio") or ""
            subject.append(f"{serie} {folio}".strip())

        ctx["subject"] = ",".join(subject)
        files = [file for f in facturas for file in f.get("files", {}).values()]

        attachment_ids = self._attach_files(files)

        email_values = {
            "email_from": "Facturación PKF Monterrey <no-reply@pkfmty.com>",
            "attachment_ids": [(6, 0, attachment_ids)],
        }

        emails = ctx.get("emails") if send_to_client else None

        emails = ",".join(
            e.strip() for e in (emails or "").split(",") if e.strip() and "@" in e
        )

        email_values["email_to"] = emails or user_email

        if send_to_client:
            email_values["email_cc"] = user_email

        template.with_context(ctx).send_mail(
            res_id=self.env.user.partner_id.id,
            force_send=kwargs.get("force_send", False),
            email_values=email_values,
        )

    def enviar_todos(self, send_to_client: bool = False) -> Literal["instant", "job"]:
        clientes = self._build_context()
        force_send = len(clientes) < 10
        if force_send:
            self._job_background(clientes, send_to_client=send_to_client)
            return "job"

        for ctx in clientes:
            self.enviar(ctx, force_send=force_send, send_to_client=send_to_client)
            time.sleep(0.25)

        return "instant"
