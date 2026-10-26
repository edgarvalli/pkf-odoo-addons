from odoo.api import Environment
from odoo.exceptions import UserError
from ..models.factura import Factura, SaldoFactura


class EstadoCuentaRepository:

    def __init__(self, env: Environment):
        self.env = env

    def _get_dbname(self) -> str:
        dbname = self.env.company.ev_contpaqi_comercial_db.dbname
        if not dbname:
            raise UserError(
                "Debe de definir la base de datos de Contpaqi en la empresa."
            )
        return dbname

    def _execute_query(self, sql: str, args=None) -> list[dict]:
        args = args or ()
        dbname = self._get_dbname()
        with self.env["ev.tools.mssql"].connect(dbname) as db:
            return db.fetchall(sql, args)

    def _base_where(self, include_vigentes: bool) -> list[str]:
        where = [
            "doc.CIDDOCUMENTODE = 4",
            "doc.CPENDIENTE > 0",
        ]
        if not include_vigentes:
            where.append(
                "DATEADD(DAY, clientes.CDIASCREDITOCLIENTE, doc.CFECHA) < @today"
            )
        return where

    def _build_query(
        self, include_vigentes: bool = False, wheres: list[str] = None
    ) -> str:
        where_clause = self._base_where(include_vigentes)
        if wheres:
            where_clause.extend(wheres)

        sql = f"""
            DECLARE @today DATE = CAST(GETDATE() AS DATE);

            WITH Facturas AS (
                SELECT
                    doc.CIDDOCUMENTO AS id,
                    doc.CFECHA AS fecha,
                    doc.CSERIEDOCUMENTO AS serie,
                    CAST(doc.CFOLIO AS INT) AS folio,
                    doc.CIDCLIENTEPROVEEDOR AS cliente_id,
                    clientes.CCODIGOCLIENTE AS cliente_codigo,
                    doc.CRAZONSOCIAL AS cliente_nombre,
                    doc.CRFC AS cliente_rfc,
                    cv.CIDVALORCLASIFICACION AS grupo_id,
                    cv.CVALORCLASIFICACION AS grupo_nombre,
                    cv.CCODIGOVALORCLASIFICACION AS grupo_codigo,
                    doc.CIDCONCEPTODOCUMENTO AS concepto_id,
                    doc.CREFERENCIA AS referencia,
                    doc.COBSERVACIONES AS observaciones,
                    CAST(doc.CTOTAL AS DECIMAL(18,2)) AS total,
                    CAST(doc.CPENDIENTE AS DECIMAL(18,2)) AS saldo_pendiente,
                    folios.CUUID AS uuid,
                    CONCAT_WS(',',
                        NULLIF(clientes.CEMAIL1, ''),
                        NULLIF(clientes.CEMAIL2, ''),
                        NULLIF(clientes.CEMAIL3, '')
                    ) AS emails,
                    DATEDIFF(DAY, doc.CFECHA, @today) AS diasvencidos
                FROM admDocumentos doc
                INNER JOIN admFoliosDigitales folios ON folios.CIDDOCTO = doc.CIDDOCUMENTO
                INNER JOIN admClientes clientes ON clientes.CIDCLIENTEPROVEEDOR = doc.CIDCLIENTEPROVEEDOR
                INNER JOIN admClasificacionesValores cv ON cv.CIDVALORCLASIFICACION = clientes.CIDVALORCLASIFCLIENTE1
                WHERE {" AND ".join(where_clause)}
            )
            SELECT
                *,
                CASE
                    {"WHEN diasvencidos <= 30 THEN 'vigente'" if include_vigentes else ""}
                    WHEN diasvencidos BETWEEN 31 AND 60 THEN 'vencida30'
                    WHEN diasvencidos BETWEEN 61 AND 90 THEN 'vencida60'
                    ELSE 'vencido'
                END AS estatus
            FROM Facturas
            {"WHERE diasvencidos > 30" if not include_vigentes else ""}
            ORDER BY fecha ASC;
        """
        return sql

    def get_facturas(
        self, idcliente: int | None = None, include_vigentes: bool = False
    ) -> list[Factura]:
        wheres = []
        params = []
        if idcliente:
            wheres.append("doc.CIDCLIENTEPROVEEDOR = ?")
            params.append(idcliente)

        sql = self._build_query(include_vigentes, wheres)
        rows = self._execute_query(sql, tuple(params))
        return [Factura.from_dict(row) for row in rows] if rows else []

    def getall_facturas(
        self,
        include_vigentes: bool = False,
        wheres: list[str] = None,
        args: tuple = None,
    ) -> list[Factura]:
        sql = self._build_query(include_vigentes, wheres or [])
        rows = self._execute_query(sql, args)
        return [Factura.from_dict(row) for row in rows] if rows else []

    def get_saldo_facturas(self, segmento: str = None) -> list[SaldoFactura]:

        if segmento:
            facturas = self.getall_facturas(
                wheres=["mov.CSCMOVTO = ?"], args=(segmento,)
            )
        else:
            facturas = self.getall_facturas()

        saldos = {}

        for fact in facturas:
            cursor = saldos.setdefault(
                fact.cliente.id,
                {
                    "cliente": fact.cliente,
                    "grupo": fact.grupo,
                    "saldo_total": 0,
                    "saldo_vigente": 0,
                    "saldo_vencido30": 0,
                    "saldo_vencido60": 0,
                    "saldo_vencido": 0,
                    "saldo_pendiente": 0,
                },
            )

            cursor["saldo_total"] += fact.total
            cursor["saldo_pendiente"] += fact.saldo_pendiente

            if fact.estatus == "vencida30":
                cursor["saldo_vencido30"] += fact.total
            elif fact.estatus == "vencida60":
                cursor["saldo_vencido60"] += fact.total
            elif fact.estatus == "vencido":
                cursor["saldo_vencido"] += fact.total
            else:
                cursor["saldo_vigente"] += fact.total

        return [SaldoFactura(**s) for s in saldos.values()]
