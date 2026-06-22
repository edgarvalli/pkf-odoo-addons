from odoo.models import AbstractModel
from odoo.exceptions import UserError
from ..services.estado_cuenta_service import EstadoCuentaService


class PKFClientes(AbstractModel):
    _name = "pkf.clientes"
    _description = "PKF Clientes"

    def saldo_clientes(self, filter={}):
        edo = self.env["ev.contpaqi.comercial"].saldo_clientes(
            saldo_cero=bool(int(filter.get("saldocero", 0)))
        )
        if not edo:
            raise UserError("No se encontraron clientes")

        edo = [self.env["ev.tools"].dict_parser(e) for e in edo]
        return edo

    def enviar_estado_cuenta(self, idcliente: int, emails: list[str] = None):
        srv = EstadoCuentaService(self.env)
        return srv.enviar_estado_cuenta_cliente(idcliente, emails)

    def buscar_clientes(self, **args):
        fields = args.get(
            "fields",
            [
                "CIDCLIENTEPROVEEDOR",
                "CCODIGOCLIENTE",
                "CRAZONSOCIAL",
                "CRFC",
            ],
        )
        val = args.get("val", "")
        limit = args.get("limit", 50)
        sql = f"""
            SELECT TOP {limit} {",".join(fields)} FROM admClientes
            WHERE (CRAZONSOCIAL LIKE ? OR CRFC LIKE ?) AND (CIDCLIENTEPROVEEDOR > 1)
        """
        dbname = self.env.company.ev_contpaqi_comercial_db.dbname
        with self.env["ev.tools.mssql"].connect(dbname) as db:
            return db.fetchall(sql, (f"%{val}%", f"%{val}%"))

    def get_monedas(self):

        dbname = self.env.company.ev_contpaqi_comercial_db.dbname

        if not dbname:
            return []

        sql = """
            SELECT
                CIDMONEDA idmoneda,
                CNOMBREMONEDA nombre,
                CSIMBOLOMONEDA simbolo,
                CPLURAL plural,
                CCLAVESAT claveSat
            FROM admMonedas;
        """

        with self.env["ev.tools.mssql"].connect(dbname) as db:
            return db.fetchall(sql)
