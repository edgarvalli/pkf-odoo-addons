from odoo.models import AbstractModel
from odoo.exceptions import UserError
from ..services.estado_cuenta_clientes.repository import EstadoCuentaRepository


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
        srv = self.env["pkf.estado.cuenta.service"]
        return srv.enviar_estado_de_cuenta(idcliente, emails, include_vigentes=True)

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

    def saldo_by_segmento(self):
        # Verifica si el usuario pertenece a los grupos con acceso completo
        full_access = self.env.user.has_group(
            "pkf_clientes.pkf_group_directores"
        ) or self.env.user.has_group("pkf_clientes.pkf_group_socios")

        segmento = self.env.user.employee_id.segmento_pkf

        # Si no tiene segmento y tampoco full_access, no regresa nada
        if not segmento and not full_access:
            return []

        if full_access:
            segmento = None

        repo = EstadoCuentaRepository(self.env)

        invoices = repo.get_saldo_facturas(segmento)

        return [inv.to_dict() for inv in invoices]

    def facturas_by_cliente(self, cliente_id: int):

        if not cliente_id:
            return []
        repo = EstadoCuentaRepository(self.env)

        facturas = repo.get_facturas(
            wheres=["doc.CIDCLIENTEPROVEEDOR = ?"], args=(cliente_id,)
        )

        return [f.to_dict() for f in facturas]
