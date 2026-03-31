from typing import List
from dataclasses import dataclass
from odoo.orm.environments import Environment
from ..types.saldos_types import DocumentoSaldoRow, SaldoCliente, FacturaDict


@dataclass
class SaldosComercialService:
    env: Environment

    def get_saldos(self) -> List[SaldoCliente]:
        mssql = self.env["ev.tools.mssql"]
        dbname = self.env.company.ev_contpaqi_comercial_db.dbname

        if not dbname:
            raise ValueError(
                "No se ha definido la base de datos comercial en la empresa."
            )

        try:
            with mssql.connect(dbname) as db:
                facturas = db.fetchall(self._get_sql())
                return self._format_data(facturas)

        except Exception as e:
            raise ValueError(str(e))

    def _get_sql(self):
        return """
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
            CONCAT_WS(',',
                NULLIF(TRIM(c.CEMAIL1), ''),
                NULLIF(TRIM(c.CEMAIL2), ''),
                NULLIF(TRIM(c.CEMAIL3), '')
            ) AS emails,
            CASE
                WHEN DATEDIFF(DAY,doc.CFECHA, @today) BETWEEN 1 AND 30 THEN 'vigente'
                WHEN DATEDIFF(DAY,doc.CFECHA, @today) BETWEEN 31 AND 60 THEN 'vencido_60'
                WHEN DATEDIFF(DAY,doc.CFECHA, @today) > 61 THEN 'vencido'
            END AS estatus
        FROM admDocumentos doc
        INNER JOIN admFoliosDigitales folios ON folios.CIDDOCTO = doc.CIDDOCUMENTO
        INNER JOIN admClientes c ON c.CIDCLIENTEPROVEEDOR = doc.CIDCLIENTEPROVEEDOR
        WHERE doc.CPENDIENTE > 0 AND doc.CIDDOCUMENTODE = 4
        ORDER BY doc.CFECHA
    """

    def _format_data(self, data: list[DocumentoSaldoRow]) -> List[SaldoCliente]:
        root = {}

        for row in data:
            cliente_id = row.get("cliente_id")
            if cliente_id not in root:
                saldo: SaldoCliente = {
                    "id_cliente": cliente_id,
                    "razon_social": row.get("cliente_nombre"),
                    "rfc": row.get("cliente_rfc"),
                    "emails": row.get("emails"),
                    "facturas": [],
                }

                root[cliente_id] = saldo

            inv: FacturaDict = {
                "fecha": row.get("fecha"),
                "serie_folio": row.get("serie_folio"),
                "uuid": row.get("uuid"),
                "observaciones": row.get("observaciones"),
                "total": row.get("total", 0),
                "pendiente": row.get("pendiente", 0),
                "estatus": row.get("estatus"),
            }

            cursor: SaldoCliente = root[cliente_id]
            cursor["facturas"].append(inv)

        return list(root.values())
