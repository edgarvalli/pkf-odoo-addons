from odoo.api import Environment
from odoo.exceptions import UserError

from ..models.grupo import Grupo
from ..models.cliente import Cliente


class ComercialRepository:
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

    def getall_clientes(self) -> list[Cliente]:
        sql = """
            SELECT
                c.CIDCLIENTEPROVEEDOR id,
                c.CCODIGOCLIENTE codigo,
                c.CRAZONSOCIAL razon_social,
                c.CRFC rfc,
                CONCAT_WS(',',
                    NULLIF(c.CEMAIL1, ''),
                    NULLIF(c.CEMAIL2, ''),
                    NULLIF(c.CEMAIL3, '')
                ) AS emails,
                grupo.CIDVALORCLASIFICACION grupo_id,
                grupo.CVALORCLASIFICACION grupo_nombre,
                grupo.CCODIGOVALORCLASIFICACION grupo_codigo
            FROM admClientes c
            INNER JOIN admClasificacionesValores grupo ON grupo.CIDVALORCLASIFICACION = c.CIDVALORCLASIFCLIENTE1
            WHERE c.CIDCLIENTEPROVEEDOR > 0 AND c.CTIPOCLIENTE <= 2 AND c.CESTATUS = 1;
        """

        rows = self._execute_query(sql)

        if not rows:
            return []

        return [Cliente.from_dict(row) for row in rows]

    def getall_groups(self) -> list[Grupo]:
        sql = """
            SELECT
                CIDVALORCLASIFICACION id,
                CCODIGOVALORCLASIFICACION codigo,
                CVALORCLASIFICACION nombre
            FROM admClasificacionesValores
            WHERE CIDVALORCLASIFICACION > 0;
        """
        rows = self._execute_query(sql)

        if not rows:
            return []

        return [Grupo(**row) for row in rows]
