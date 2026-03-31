from pathlib import Path
from .empleado import Empleado
from num2words import num2words
import base64, io, qrcode, zipfile
from odoo.orm.environments import Environment
from odoo.modules.module import get_module_path
from typing import TYPE_CHECKING, TypedDict, List

if TYPE_CHECKING:
    from ev_contpaqi.types.comprobanate_type import NominaRow
else:
    from odoo.addons.ev_contpaqi.types.comprobanate_type import NominaRow


class OdooEnv:
    env: Environment
    _name: str
    lang: str


class ComprobanteContext(TypedDict):
    logo_pkf: str
    image_qr: str
    importe_letra: str
    doc: NominaRow
    o: OdooEnv


class ComprobanteNomina:

    def __init__(self, env: Environment, id: int):
        if id is None:
            raise ValueError("Debe de definir un ID")

        self.env = env
        self.id = id
        self.ctx: ComprobanteContext = {}
        self.static_folder = Path(get_module_path("pkf_nominas")) / "static/"
        self._build_context()

    def _get_dbname(self):
        dbname = self.env.company.ev_contpaqi_nominas_db.dbname or None
        if not dbname:
            raise ValueError("No se ha configurado la base de datos en la compañia.")
        return dbname

    def _get_data(self):
        try:
            self.ctx["doc"] = self.env["ev.contpaqi.nominas"].datos_comprobante(self.id)
        except Exception as e:
            raise ValueError(f"Ocurrio un error al obtener los dict del XML: {str(e)}")

    def _get_logo(self):
        logo_path = self.static_folder / "images/pkf_logo.png"
        if logo_path.exists():
            with open(logo_path, "rb") as fimg:
                img_data = fimg.read()
                img_encode = base64.b64encode(img_data)
                return f"data:image/png;base64, {img_encode.decode('utf-8')}"

    def _make_qr(self):
        sat_url = self.ctx["doc"].get("sat_url", "")
        buffer = io.BytesIO()
        qr = qrcode.make(sat_url)
        qr.save(buffer, format="PNG")
        return base64.b64encode(buffer.getvalue()).decode()

    def _importe_letra(self):
        total = self.ctx.get("doc", {}).get("totales", {})["neto"]
        entero = int(total)
        centavos = int(round((total - entero) * 100))
        return f"{num2words(entero, lang='es').upper()} PESOS {centavos:02d}/100 M.N."

    def _periodo_text(self):
        doc = self.ctx.get("doc", {})

        inicial = doc.get("fecha_inicial_pago").strftime("%d/%m/%Y")
        final = doc.get("fecha_final_pago").strftime("%d/%m/%Y")

        period = f"{inicial} - {final}"
        data = [
            doc.get("periodo", ""),
            doc.get("empleado", {}).get("periodicidad"),
            period,
        ]
        return " ".join(map(str, data))

    def _build_context(self):
        self._get_data()
        self.ctx["doc"]["periodo_text"] = self._periodo_text()
        self.ctx["logo_pkf"] = self._get_logo()
        self.ctx["image_qr"] = self._make_qr()
        self.ctx["importe_letra"] = self._importe_letra()
        self.ctx["o"] = self.env["res.partner"].search([], limit=1)

    def _check_owner(self):
        evnominas = self.env["ev.contpaqi.nominas"]
        empleado = Empleado(env=self.env).get_empleado()
        codigo = empleado.get("codigo")
        if evnominas.verificar_pertenencia_comprobante(codigo, self.id) == False:
            raise ValueError(f"El documento no pertenece a {codigo}")

    ### Methods

    def make_pdf(self):
        self._check_owner()
        template = self.env["ir.actions.report"]

        pdf_content, _ = template._render_qweb_pdf(
            "pkf_nominas.comprobante_nomina_pkf", data=self.ctx
        )

        filename = self.ctx.get("doc", {}).get("uuid")
        headers = [
            ("Content-Type", "application/pdf"),
            ("Content-Length", str(len(pdf_content))),
            (
                "Content-Disposition",
                f'inline; filename="{filename}.pdf"',
            ),
        ]

        return {"type": "pdf", "content": pdf_content, "headers": headers}

    def get_xml(self):
        self._check_owner()
        return self.ctx.get("doc").get("cfdi").get("content")


class ComprobantesZipService:
    def __init__(self, env: Environment, ids: List[int]):
        self.env = env
        self.ids = ids

    def build_zip(self) -> bytes:
        zip_buffer = io.BytesIO()

        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
            for comprobante_id in self.ids:
                comp = ComprobanteNomina(self.env, comprobante_id)

                pdf = comp.make_pdf()
                xml = comp.get_xml()

                uuid = comp.ctx.get("doc", {}).get("uuid", str(comprobante_id))

                # PDF
                zf.writestr(f"{uuid}.pdf", pdf["content"])

                # XML
                zf.writestr(f"{uuid}.xml", xml)

        zip_buffer.seek(0)
        return zip_buffer.getvalue()
