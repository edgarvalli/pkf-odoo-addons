from odoo.api import Environment
from odoo.exceptions import UserError

from .models import Email


class EmailRepository:

    def __init__(self, env: Environment):
        self.env = env
        self.load()

    def get_from_sql(self, uuids: list[str] | None = None) -> list[Email]:
        dbname = self.env.company.ev_contpaqi_comercial_db.dbname

        if not dbname:
            raise UserError("Debe definir una base de datos en la empresa")

        uuids = uuids or []

        placeholders = ",".join(["?"] * len(uuids))

        sql = f"""
            SELECT
                c.CIDCLIENTEPROVEEDOR idcliente,
                fd.CUUID uuid,
                CONCAT_WS(',',
                    NULLIF(TRIM(c.CEMAIL1), ''),
                    NULLIF(TRIM(c.CEMAIL2), ''),
                    NULLIF(TRIM(c.CEMAIL3), '')
                ) AS emails
            FROM admFoliosDigitales fd
            INNER JOIN admDocumentos doc
                ON doc.CIDDOCUMENTO = fd.CIDDOCTO
            INNER JOIN admClientes c
                ON c.CIDCLIENTEPROVEEDOR = doc.CIDCLIENTEPROVEEDOR
            WHERE fd.CUUID IN ({placeholders});
        """

        with self.env["ev.tools.mssql"].connect(dbname) as db:
            rows = db.fetchall(sql, tuple(uuids))

        return [
            Email(idcliente=row["idcliente"], uuid=row["uuid"], emails=row["emails"])
            for row in rows
        ]

    def get_map(self, uuids: list[str]) -> dict[str, Email]:
        return {e.uuid: e for e in self.get_from_sql(uuids)}
