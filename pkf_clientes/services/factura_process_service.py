import requests
from odoo import models
from odoo.exceptions import UserError
from ..types.facturacion_job import FacturacionJobItem


class FacturaProcessService(models.AbstractModel):
    _name = "pkf.factura.process.service"

    def _get_url_api(self):
        config = self.env["ir.config_parameter"].sudo()
        url: str = config.get_param("contpaqi_api_url")
        url = url[:-1] if url.endswith("/") else url

        if url:
            return f"{url}/api/process-facturas"
        else:
            return "/api/process-facturas"

    def _get_facturas_template(self):
        facturas = self.env["pkf.factura.template"].search([("active", "=", True)])

        result = []

        for fact in facturas:
            observaciones = self.env["pkf.factura.template.renderer"].render(fact)
            result.append(
                {
                    "idtemplate": fact.id,
                    "codigo_cliente": fact.codigo_cliente,
                    "idmoneda": fact.idmoneda,
                    "codigo_concepto": fact.codigo_concepto,
                    "referencia": fact.referencia,
                    "observaciones": observaciones,
                    "movimientos": [
                        {
                            "codigo_producto": mov.codigo_producto,
                            "unidades": mov.unidades,
                            "precio": mov.precio,
                            "segmento": mov.segmento,
                        }
                        for mov in fact.moves_ids
                    ],
                }
            )
        return result

    def _build_body(self, cert_password):
        config = self.env["ir.config_parameter"].sudo()
        callback_url = (
            config.get_param("web.base.url") + "/pkfmty/api/v1/factura-template/process"
        )
        return {
            "facturas": self._get_facturas_template(),
            "dbname": self.env.company.ev_contpaqi_comercial_db.dbname,
            "callbackUrl": callback_url,
            "certPassword": cert_password,
        }

    def process(self, cert_password):
        process_key = "pkf.factura.template.process_uuid"

        config = self.env["ir.config_parameter"].sudo()
        puid = config.get_param(process_key)
        if puid:
            msg = f"Ya hay un proceso corriendo con uuid: {puid}"
            print(msg)
            return {"error": True, "message": msg}

        response = requests.post(
            self._get_url_api(),
            json=self._build_body(cert_password),
            timeout=30,
        )

        response.raise_for_status()

        data = response.json() if response.content else {}

        uid = data.get("uuid")

        if uid:
            config.set_param(process_key, uid)

        return {"error": False, "message": ""}


class FacturaQueueService(models.AbstractModel):
    _name = "pkf.factura.queue.service"

    def _get_emails_from_sql(self, doc_ids=[]):

        dbname = self.env.company.ev_contpaqi_comercial_db.dbname

        if not dbname:
            raise UserError("Debe definir una base de datos en la empresa")

        if not doc_ids:
            return {}

        placeholders = ",".join(["?"] * len(doc_ids))

        sql = f"""
            SELECT
                c.CIDCLIENTEPROVEEDOR AS id_cliente,
                c.CCODIGOCLIENTE codigo_cliente,
                CONCAT_WS(',',
                    NULLIF(TRIM(c.CEMAIL1), ''),
                    NULLIF(TRIM(c.CEMAIL2), ''),
                    NULLIF(TRIM(c.CEMAIL3), '')
                ) AS emails
            FROM admClientes c
            WHERE c.CIDCLIENTEPROVEEDOR IN (
                SELECT DISTINCT CIDCLIENTEPROVEEDOR
                FROM admDocumentos
                WHERE CIDDOCUMENTO IN ({placeholders})
            )
        """

        with self.env["ev.tools.mssql"].connect(dbname) as db:
            rows = db.fetchall(sql, tuple(doc_ids))

            return {row["codigo_cliente"]: row for row in rows}

    def create_email_queue(self, jobid: int):
        srv = self.env["pkf.factura.process.service"].sudo()
        inv_srv = self.env["pkf.factura.template"].sudo()

        url = f"{srv._get_url_api()}/items/{jobid}"

        response = requests.get(url)
        response.raise_for_status()

        job_items: list[FacturacionJobItem] = response.json()
        if not job_items:
            return False

        for item in job_items:
            if item.get("status", "") == "Completed":

                fact = inv_srv.search([("id", "=", item.get("idTemplate", 0))], limit=1)

                if not fact:
                    continue

                pago = (fact.pago or 0) + 1

                fact.write(
                    {
                        "idcomercial": item.get("idComercial", 0),
                        "serie": item.get("serie", ""),
                        "folio": item.get("folio", 0),
                        "pago": pago,
                    }
                )

        return True
