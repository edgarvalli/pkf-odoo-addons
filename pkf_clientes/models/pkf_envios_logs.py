import io
import base64
import xlsxwriter
from odoo import models, fields
from odoo.fields import Datetime as OdooDatetime


class PKFEnviosLog(models.Model):
    _name = "pkf.envios.logs"
    _description = "Modelo para guardar los log de envios"

    uuid = fields.Char("UUID", size=32)
    fecha = fields.Datetime("Fecha")
    cliente = fields.Char("Cliente", size=255)
    rfc = fields.Char("Rfc", size=14)
    estatus = fields.Selection(
        selection=[
            ("ok", "Enviado"),
            ("error", "Ocurrió un error al enviar"),
        ],
        string="Estatus",
    )
    evento = fields.Text("Evento")

    def generar_bitacora_excel(self, uid: str, **kwargs):
        self = self.sudo()
        logs = self.search_read(domain=[("uuid", "=", uid)]) or []

        output = io.BytesIO()
        wb = xlsxwriter.Workbook(output, {"in_memory": True})

        bold = wb.add_format({"bold": True})
        date_format = wb.add_format({"num_format": "dd/mm/yyyy hh:mm:ss"})

        sheet = wb.add_worksheet("Bitacora")

        # Header info
        sheet.write("A1", "Proceso UUID:", bold)
        sheet.write("B1", uid)

        start = kwargs.get("startdate")
        end = kwargs.get("enddate")

        if start and end:
            sheet.write("A2", "Inicio:", bold)
            sheet.write_datetime("B2", start, date_format)

            sheet.write("A3", "Final:", bold)
            sheet.write_datetime("B3", end, date_format)

        # Tabla
        row = 5
        headers = ["UUID", "Fecha", "Cliente", "RFC", "Estatus", "Evento"]

        for col, h in enumerate(headers):
            sheet.write(row, col, h, bold)

        row += 1

        for log in logs:
            fecha = log.get("fecha")

            # convertir string a datetime si es necesario
            if isinstance(fecha, str):
                fecha = OdooDatetime.from_string(fecha)

            values = [
                log.get("uuid"),
                fecha,
                log.get("cliente"),
                log.get("rfc"),
                log.get("estatus"),
                log.get("evento"),
            ]

            for col, val in enumerate(values):
                if col == 1 and val:
                    sheet.write_datetime(row, col, val, date_format)
                else:
                    sheet.write(row, col, val)

            row += 1

        # Ajustar columnas
        sheet.set_column("A:A", 25)
        sheet.set_column("B:B", 20)
        sheet.set_column("C:C", 35)
        sheet.set_column("D:D", 18)
        sheet.set_column("E:E", 15)
        sheet.set_column("F:F", 50)

        # Filtro
        sheet.autofilter(5, 0, row - 1, len(headers) - 1)

        wb.close()

        output.seek(0)

        file_data = base64.b64encode(output.read())

        # Crear attachment en Odoo
        attachment = self.env["ir.attachment"].create(
            {
                "name": f"bitacora_estado_cuenta_{uid}.xlsx",
                "type": "binary",
                "datas": file_data,
                "mimetype": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }
        )

        return attachment
