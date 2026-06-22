import json
from odoo import models


class ContpaqiFacturaService(models.AbstractModel):
    _name = "pkf.contpaqi.factura.service"
    _description = "PKF - Servicio Facturacion CONTPAQi"

    def _get_dbname(self):
        return self.env.company.ev_contpaqi_comercial_db.dbname

    def get_conceptos(self):
        dbname = self._get_dbname()

        if not dbname:
            return []

        sql = """
            SELECT
                CIDCONCEPTODOCUMENTO idconcepto,
                CCODIGOCONCEPTO codigo,
                CNOMBRECONCEPTO nombre
            FROM admConceptos
            WHERE CIDDOCUMENTODE = 4;
        """

        with self.env["ev.tools.mssql"].connect(dbname) as db:
            return db.fetchall(sql)

    def get_monedas(self):
        dbname = self._get_dbname()

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

    def get_productos(self, value="", limit=50):
        dbname = self._get_dbname()

        if not dbname:
            return []

        sql = f"""
            SELECT TOP {limit}
                CIDPRODUCTO idproducto,
                CCODIGOPRODUCTO codigo,
                CNOMBREPRODUCTO nombre,
                CTIPOPRODUCTO idtipo,
                CFECHAALTAPRODUCTO fechaAlta,
                CPRECIO1 precio
            FROM admProductos
            WHERE CIDPRODUCTO > 1
              AND (
                    CNOMBREPRODUCTO LIKE ?
                 OR CCODIGOPRODUCTO LIKE ?
              );
        """

        with self.env["ev.tools.mssql"].connect(dbname) as db:
            return db.fetchall(sql, (f"%{value}%", f"%{value}%"))

    def get_metadata(self):
        fields = [
            "CIDCLIENTEPROVEEDOR idcliente",
            "CCODIGOCLIENTE codigo",
            "CRAZONSOCIAL razonSocial",
            "CRFC rfc",
        ]

        return {
            "monedas": self.get_monedas(),
            "conceptos": self.get_conceptos(),
            "clientes": self.env["pkf.clientes"].buscar_clientes(
                fields=fields,
                limit=50,
            ),
            "productos": self.get_productos(),
        }

    def get_documentos_by_serie_folio(self, folios: list[dict]):
        if not folios:
            return []

        values = []

        for item in folios:
            serie = str(item["serie"]).replace("'", "''")
            folio = int(item["folio"])
            values.append(f"('{serie}', {folio})")

        sql = f"""
            SELECT
                CIDDOCUMENTO idcomercial,
                d.CIDDOCUMENTODE iddocumentode,
                d.CIDCONCEPTODOCUMENTO idconcepto,
                d.CIDCLIENTEPROVEEDOR idcliente,
                con.CNOMBRECONCEPTO concepto,
                con.CCODIGOCONCEPTO codigo_concepto,
                CSERIEDOCUMENTO serie,
                CFOLIO folio,
                c.CCODIGOCLIENTE codigo_cliente,
                d.CRAZONSOCIAL razonsocial,
                d.CRFC rfc,
                m.CIDMONEDA idmoneda,
                m.CNOMBREMONEDA moneda,
                CREFERENCIA referencia,
                COBSERVACIONES observaciones_template,
                CREFERENCIA referencia,
                1 AS pago,
                12 AS total_pagos,
                (
                    SELECT
                        CIDMOVIMIENTO idcomercial,
                        mov.CIDPRODUCTO idproducto,
                        p.CNOMBREPRODUCTO producto,
                        p.CCODIGOPRODUCTO codigo_producto,
                        mov.CSCMOVTO segmento,
                        mov.CUNIDADES unidades,
                        mov.CPRECIO precio
                    FROM admMovimientos mov
                    INNER JOIN admProductos p ON p.CIDPRODUCTO = mov.CIDPRODUCTO
                    WHERE mov.CIDDOCUMENTO = d.CIDDOCUMENTO FOR JSON PATH
                ) AS movimientos
            FROM admDocumentos d
            INNER JOIN admMonedas m ON m.CIDMONEDA = d.CIDMONEDA
            INNER JOIN admClientes c ON c.CIDCLIENTEPROVEEDOR = d.CIDCLIENTEPROVEEDOR
            INNER JOIN admConceptos con ON con.CIDCONCEPTODOCUMENTO = d.CIDCONCEPTODOCUMENTO
            INNER JOIN (VALUES{",".join(values)}) v(serie, folio) ON d.CSERIEDOCUMENTO = v.serie AND v.folio = d.CFOLIO
            WHERE CIDDOCUMENTO > 1;
        """
        with self.env["ev.tools.mssql"].connect(self._get_dbname()) as db:
            rows = db.fetchall(sql)
            for row in rows:
                row["movimientos"] = json.loads(row["movimientos"] or "[]")
            return rows
