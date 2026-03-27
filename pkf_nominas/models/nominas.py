from pathlib import Path
import qrcode, base64, io
from num2words import num2words
from odoo import models, exceptions
from odoo.modules.module import get_module_path


class Nominas(models.AbstractModel):
    _name = "pkf.nominas"
    _description = "Modulo de Nominas PKF"

    def _make_pdf(self, data):
        cwd = Path(get_module_path("pkf_nominas"))

        report_action = self.env["ir.actions.report"]

        logo_path = cwd / "static/images/pkf_logo.png"

        if logo_path.exists():
            with open(logo_path, "rb") as fimg:
                img_data = fimg.read()
                img_encode = base64.b64encode(img_data)
                logo_pkf = f"data:image/png;base64, {img_encode.decode('utf-8')}"

        setattr(data, "_name", self._name)
        setattr(data, "id", self.id)
        setattr(data, "lang", self.env.context.get("lang"))
        setattr(data, "env", self.env)

        buffer = io.BytesIO()
        qr = qrcode.make(data.sat_url)
        qr.save(buffer, format="PNG")
        qrimage = base64.b64encode(buffer.getvalue()).decode()

        setattr(data, "image_qr", f"data:image/png;base64,{qrimage}")

        total = data.totales.neto
        entero = int(total)
        centavos = int(round((total - entero) * 100))

        importe_letra = (
            f"{num2words(entero, lang='es').upper()} PESOS {centavos:02d}/100 M.N."
        )
        setattr(data.totales, "importe_letra", importe_letra)

        finicial = data.fecha_inicial_pago.strftime("%d/%m/%Y")
        ffinal = data.fecha_final_pago.strftime("%d/%m/%Y")

        periodo_text = (
            f"{data.periodo} {data.empleado.periodicidad}        {finicial} - {ffinal}"
        )

        setattr(data, "periodo_text", periodo_text)

        pdf_content, _ = report_action._render_qweb_pdf(
            "pkf_nominas.report_pkf_nomina_recibo_pdf",
            data={"doc": data, "logo_pkf": logo_pkf},
        )

        headers = [
            ("Content-Type", "application/pdf"),
            ("Content-Length", str(len(pdf_content))),
            ("Content-Disposition", f'inline; filename="{data.cfdi.uuid}.pdf"'),
        ]

        return {"type": "pdf", "content": pdf_content, "headers": headers}

    def empleado(self):
        try:
            euser = self.env["hr.employee"].search(
                [["user_id", "=", self.env.uid]], limit=1
            )
            if not euser:
                raise exceptions.UserError("Empleado no encontrado")

            euser: dict = self.env["ev.contpaqi.nominas"].buscar_empleado(
                euser.ev_employee_code
            )

            if not euser:
                raise exceptions.UserError("Empleado no encontrado")

            return euser
        except Exception as e:
            raise exceptions.UserError(
                f"Ocurrio un error al buscar el empleado: {str(e)}."
            )

    def make_document(self, data, doc_type: str):

        if doc_type.lower() == "pdf":
            return self._make_pdf(data)

        xml_content = data.cfdi.content
        headers = [("Content-Type", "application/xml; charset=utf-8")]
        return {"type": "xml", "headers": headers, "content": xml_content}

        # Get logo b64
