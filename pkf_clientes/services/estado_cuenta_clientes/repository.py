from .types import FacturaRow
from odoo.api import Environment
from odoo.exceptions import UserError
from .models import Factura, SaldoFactura


class EstadoCuentaRepository:

    def __init__(self, env: Environment):
        self.env = env

    # ----------------------------
    # DB CONNECTION
    # ----------------------------
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

    # ----------------------------
    # QUERY BUILDER HELPERS
    # ----------------------------
    def _base_where(self, include_vigentes: bool) -> list[str]:
        where = [
            "doc.CIDDOCUMENTODE = 4",
            "doc.CPENDIENTE > 0",
        ]

        # SOLO filtra vencidas si no quieres vigentes
        if not include_vigentes:
            where.append(
                "DATEADD(DAY, clientes.CDIASCREDITOCLIENTE, doc.CFECHA) < @today"
            )

        return where

    def _build_query(
        self, include_vigentes: bool = False, wheres: list[str] = None
    ) -> str:
        where_clause = self._base_where(include_vigentes)
        where_clause = [*where_clause, *wheres]

        sql = f"""
            DECLARE @today DATE = CAST(GETDATE() AS DATE);

            WITH Facturas AS (
                SELECT
                    doc.CIDDOCUMENTO AS iddocumento,
                    clientes.CIDCLIENTEPROVEEDOR AS idcliente,
                    doc.CSERIEDOCUMENTO AS serie,
                    doc.CFOLIO AS folio,
                    CONCAT(doc.CSERIEDOCUMENTO, ' ', doc.CFOLIO) AS seriefolio,
                    doc.CFECHA AS fecha,

                    DATEADD(DAY, clientes.CDIASCREDITOCLIENTE, doc.CFECHA) AS fechavencimiento,

                    DATEDIFF(
                        DAY,
                        DATEADD(DAY, clientes.CDIASCREDITOCLIENTE, doc.CFECHA),
                        @today
                    ) AS diasvencidos,

                    doc.CRAZONSOCIAL AS razonsocial,
                    doc.CRFC AS rfc,

                    CONCAT_WS(',',
                        NULLIF(clientes.CEMAIL1, ''),
                        NULLIF(clientes.CEMAIL2, ''),
                        NULLIF(clientes.CEMAIL3, '')
                    ) AS emails,

                    doc.COBSERVACIONES AS observaciones,
                    doc.CREFERENCIA AS referencia,
                    folios.CUUID AS uuid,

                    clientes.CDIASCREDITOCLIENTE AS diascredito,
                    doc.CTOTAL AS total,
                    doc.CPENDIENTE AS pendiente

                FROM admDocumentos doc
                INNER JOIN admFoliosDigitales folios
                    ON folios.CIDDOCTO = doc.CIDDOCUMENTO
                INNER JOIN admClientes clientes
                    ON clientes.CIDCLIENTEPROVEEDOR = doc.CIDCLIENTEPROVEEDOR

                WHERE {" AND ".join(where_clause)}
            )

            SELECT
                *,
                CASE
                    {"WHEN diasvencidos <= 0 THEN 'vigente'" if include_vigentes else ""}
                    WHEN diasvencidos BETWEEN 31 AND 60 THEN 'vencido30'
                    WHEN diasvencidos BETWEEN 61 AND 90 THEN 'vencido60'
                    ELSE 'vencido'
                END AS estatus

            FROM Facturas
            {"WHERE diasvencidos > diascredito" if not include_vigentes else ""}
            ORDER BY fecha ASC;
        """

        return sql

    # ----------------------------
    # PUBLIC API
    # ----------------------------
    def get_facturas(
        self, idcliente: int | None = None, include_vigentes: bool = False
    ) -> list[FacturaRow]:

        wheres = []
        params = []

        if idcliente:
            wheres.append(idcliente)
            params.append(idcliente)

        sql = self._build_query(include_vigentes, wheres)

        return self._execute_query(sql, tuple(params))

    def get_facturas(
        self, wheres: list[str] = None, args: tuple = None
    ) -> list[Factura]:
        wheres = wheres or []
        wheres.extend(["doc.CPENDIENTE > 0", "doc.CIDDOCUMENTODE = 4"])

        sql = f"""
            SELECT
                doc.CIDDOCUMENTO id,
                doc.CFECHA fecha,
                doc.CSERIEDOCUMENTO AS serie,
                doc.CFOLIO AS folio,
                doc.CIDCLIENTEPROVEEDOR cliente_id,
                clientes.CCODIGOCLIENTE cliente_codigo,
                doc.CRAZONSOCIAL cliente_name,
                doc.CRFC cliente_rfc,
                cv.CIDVALORCLASIFICACION grupo_id,
                cv.CVALORCLASIFICACION grupo_name,
                cv.CCODIGOVALORCLASIFICACION grupo_codigo,
                doc.CIDCONCEPTODOCUMENTO AS concepto_id,
                doc.CTOTAL AS total,
                doc.CPENDIENTE saldo_pendiente,
                folios.CUUID uuid,
                CONCAT_WS(',',
                    NULLIF(clientes.CEMAIL1, ''),
                    NULLIF(clientes.CEMAIL2, ''),
                    NULLIF(clientes.CEMAIL3, '')
                ) AS emails
            FROM admDocumentos doc
            INNER JOIN admMovimientos mov 
                ON doc.CIDDOCUMENTO = mov.CIDDOCUMENTO
            INNER JOIN admFoliosDigitales folios
                ON folios.CIDDOCTO = doc.CIDDOCUMENTO
            INNER JOIN admClientes clientes
                ON clientes.CIDCLIENTEPROVEEDOR = doc.CIDCLIENTEPROVEEDOR
            INNER JOIN admClasificacionesValores cv
                ON cv.CIDVALORCLASIFICACION = clientes.CIDVALORCLASIFCLIENTE1
            WHERE {" AND ".join(wheres)}
            ORDER BY doc.CFECHA ASC;
        """

        rows = self._execute_query(sql, args)
        if rows:
            return [Factura(**row) for row in rows]
        return []

    def get_facturas_by_segmento(self, segmento: str) -> list[Factura]:
        return self.get_facturas(wheres=["mov.CSCMOVTO = ?"], args=(segmento,))

    def get_saldo_facturas(self, segmento: str = None) -> list[SaldoFactura]:

        if segmento:
            facturas = self.get_facturas(wheres=["mov.CSCMOVTO = ?"], args=(segmento,))
        else:
            facturas = self.get_facturas()

        saldos = {}

        for fact in facturas:
            cursor = saldos.setdefault(
                fact.cliente_id,
                {
                    "cliente_id": fact.cliente_id,
                    "cliente_name": fact.cliente_name,
                    "cliente_rfc": fact.cliente_rfc,
                    "cliente_codigo": fact.cliente_codigo,
                    "grupo_id": fact.grupo_id,
                    "grupo_name": fact.grupo_name,
                    "grupo_codigo": fact.grupo_codigo,
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
            elif fact.estatus == "vencida":
                cursor["saldo_vencido"] += fact.total
            else:
                cursor["saldo_vigente"] += fact.total

        return [SaldoFactura(**s) for s in saldos.values()]
