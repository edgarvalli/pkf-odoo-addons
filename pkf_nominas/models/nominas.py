import uuid, json, base64
from typing import Literal
from odoo import models, exceptions
from ..utils.tools import next_5_min
from ..services import ComprobanteNomina, ComprobantesZipService, Empleado


class Nominas(models.AbstractModel):
    _name = "pkf.nominas"
    _description = "Modulo de Nominas PKF"

    def empleado(self, id: int = None):
        try:
            e = Empleado(self.env, idempleado=id)
            return e.get_empleado()

        except Exception as e:
            raise exceptions.UserError(
                f"Ocurrio un error al buscar el empleado: {str(e)}."
            )

    def comprobantes(self, filters=None):
        emp = Empleado(self.env)

        try:
            return emp.get_comprobantes(**filters)
        except Exception as e:
            raise exceptions.UserError(e)

    def make_document(self, iddocumento: int, doc_type: Literal["pdf", "xml"]):
        comprobante = ComprobanteNomina(self.env, id=iddocumento)
        if doc_type.lower() == "pdf":
            return comprobante.make_pdf()

        xml_content = comprobante.get_xml()
        headers = [("Content-Type", "application/xml; charset=utf-8")]
        return {"type": "xml", "headers": headers, "content": xml_content}

    def send_comprobantes_zip(self, id_attachment: int, email: str = None):
        email = email or self.env.user.email

        if not email:
            raise ValueError("No se encontró correo para el envío")

        mail = self.env["mail.mail"].create(
            {
                "subject": "Recibos de nómina",
                "body_html": "<p>Adjunto encontrarás tus recibos de nómina.</p>",
                "email_to": email,
                "attachment_ids": [(6, 0, [id_attachment])],
                "auto_delete": True,
            }
        )

        mail.send()

        return True

    def _job_bulk_recibos(self, ids: list[int], uid: str):
        try:
            zip_content = ComprobantesZipService(env=self.env, ids=ids).build_zip()

            username = self.env.user.name.split(" ")

            attachment = self.env["ir.attachment"].create(
                {
                    "name": f"recibos_nomina_{'_'.join(username)}.zip",
                    "type": "binary",
                    "datas": base64.b64encode(zip_content),
                    "mimetype": "application/zip",
                }
            )

            self.send_comprobantes_zip(attachment.id)

        finally:
            self.env["pkf.tools"].remove_current_job(uid)

    def enqueue_builk_recibos(self, ids: list[int]):

        uid = str(uuid.uuid4())

        model_id = self.env["ir.model"]._get("pkf.nominas").id
        nextcall = next_5_min()
        self.env["pkf.tools"].create_job(
            uid=uid,
            model_id=model_id,
            state="code",
            code=f"model._job_bulk_recibos({json.dumps(ids)}, '{uid}')",
            nextcall=nextcall,
        )

        return tuple([uid, nextcall])
