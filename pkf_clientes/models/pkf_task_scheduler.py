from odoo import models
from datetime import datetime
import logging, uuid

_logger = logging.getLogger(__name__)


class PKFTaskScheduler(models.AbstractModel):
    _name = "pkf.clientes.taskscheduler"
    _description = "Modulo para programar tareas"

    uid = str(uuid.uuid4())

    sql = """
        DECLARE @today DATE = CAST(GETDATE() AS DATE);

        SELECT
            doc.CIDDOCUMENTO id_documento,
            doc.CIDCLIENTEPROVEEDOR cliente_id,
            doc.CFECHA fecha,
            doc.CSERIEDOCUMENTO serie,
            doc.CFOLIO folio,
            CONCAT(doc.CSERIEDOCUMENTO,' ',doc.CFOLIO) serie_folio,
            doc.CRFC cliente_rfc,
            doc.CRAZONSOCIAL cliente_nombre,
            doc.CREFERENCIA referencia,
            doc.COBSERVACIONES observaciones,
            doc.CTOTAL total,
            doc.CPENDIENTE pendiente,
            folios.CUUID uuid,
            CONCAT_WS(',', c.CEMAIL1, c.CEMAIL2, c.CEMAIL3) emails,
            CASE
                WHEN DATEDIFF(DAY,doc.CFECHA, @today) BETWEEN 1 AND 30 THEN 'Vigente'
                WHEN DATEDIFF(DAY,doc.CFECHA, @today) BETWEEN 31 AND 60 THEN 'Vencido a 60 dias'
                WHEN DATEDIFF(DAY,doc.CFECHA, @today) BETWEEN 61 AND 90 THEN 'Vencido a 90 dias'
                WHEN DATEDIFF(DAY,doc.CFECHA, @today) > 90 THEN 'Vencido'
            END AS estatus
        FROM admDocumentos doc
        INNER JOIN admFoliosDigitales folios ON folios.CIDDOCTO = doc.CIDDOCUMENTO
        INNER JOIN admClientes c ON c.CIDCLIENTEPROVEEDOR = doc.CIDCLIENTEPROVEEDOR
        WHERE doc.CPENDIENTE > 0 AND doc.CIDDOCUMENTODE = 4
        ORDER BY doc.CFECHA
    """

    def _set_log(self, **kwargs):
        self = self.sudo()
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

    def _format_data(self, data: list[dict]):
        root = {}
        for row in data:

            cliente_id = row.get("cliente_id")

            inv = {
                "fecha": row.get("fecha"),
                "serie_folio": row.get("serie_folio"),
                "uuid": row.get("uuid"),
                "observaciones": row.get("observaciones"),
                "total": row.get("total", 0),
                "pendiente": row.get("pendiente", 0),
                "estatus": row.get("estatus"),
            }

            if cliente_id not in root:
                emails = [
                    e.strip()
                    for e in str(row.get("emails", "")).split(",")
                    if e and "@" in e
                ]

                root.setdefault(
                    cliente_id,
                    {
                        "id_documento": row.get("id_documento"),
                        "razon_social": row.get("cliente_nombre"),
                        "rfc": row.get("cliente_rfc"),
                        "emails": ",".join(emails),
                        "facturas": [],
                    },
                )

            root[cliente_id]["facturas"].append(inv)

        return [item for item in root.values()]

    def _get_facturas(self):
        mssql = self.env["ev.tools.mssql"]
        db = self.env.company.ev_contpaqi_comercial_db

        if not db:
            self.stop = True
            self._set_log(evento="No se encontro la base de datos", estatus="error")
            return []

        try:
            with mssql.connect(db) as db:
                facturas = db.fetchall(self.sql)
                return self._format_data(facturas)
        except Exception as e:
            self._set_log(evento=str(e), estatus="error")
            return []

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

    def run(self):
        data = self._get_facturas()
        _logger.info("Iniciando proceso....")
        start_process = datetime.now()
        for cliente in data[:1]:
            try:
                # enviar correo

                _cliente_name = cliente.get("razon_social")
                _logger.info(f"Enviando estado de cuenta a cliente {_cliente_name}")

                self.env["pkf.clientes.acciones"].enviar_correo(cliente)

                self._set_log(
                    cliente=cliente["razon_social"],
                    rfc=cliente["rfc"],
                    evento="Correo enviado",
                )

            except Exception as e:
                self._set_log(
                    cliente=cliente["razon_social"],
                    rfc=cliente["rfc"],
                    estatus="error",
                    evento=str(e),
                )

        end_process = datetime.now()

        self._send_bitacora(start=start_process, end=end_process)
