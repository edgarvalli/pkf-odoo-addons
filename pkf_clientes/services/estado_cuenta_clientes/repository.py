from .types import FacturaRow
from odoo.api import Environment
from odoo.exceptions import UserError


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

    def _execute_query(self, sql: str, args=None):
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
