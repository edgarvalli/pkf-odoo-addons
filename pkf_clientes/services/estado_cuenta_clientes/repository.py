from .types import FacturaRow

sql = """
    DECLARE @today DATE = CAST(GETDATE() AS DATE);
    SELECT
        doc.CIDDOCUMENTO iddocumento,
        clientes.CIDCLIENTEPROVEEDOR idcliente,
        doc.CSERIEDOCUMENTO serie,
        doc.CFOLIO folio,
        CONCAT(doc.CSERIEDOCUMENTO, ' ',doc.CFOLIO) seriefolio,
        doc.CFECHA fecha,
        DATEADD(DAY, clientes.CDIASCREDITOCLIENTE, doc.CFECHA) fechavencimiento,
        DATEDIFF(
            DAY,
            DATEADD(DAY, clientes.CDIASCREDITOCLIENTE, doc.CFECHA),
            @today
        ) diasvencidos,
        doc.CRAZONSOCIAL razonsocial,
        doc.CRFC rfc,
        CONCAT_WS(',',
            NULLIF(clientes.CEMAIL1, ''),
            NULLIF(clientes.CEMAIL2, ''),
            NULLIF(clientes.CEMAIL3, '')) AS emails,
        doc.COBSERVACIONES observaciones,
        doc.CREFERENCIA referencia,
        folios.CUUID uuid,
        clientes.CDIASCREDITOCLIENTE diascredito,
        CASE
            WHEN DATEDIFF(DAY, DATEADD(DAY, clientes.CDIASCREDITOCLIENTE, doc.CFECHA), @today) BETWEEN 31 AND 60 THEN 'vencido60'
            WHEN DATEDIFF(DAY, DATEADD(DAY, clientes.CDIASCREDITOCLIENTE, doc.CFECHA), @today) > 60 THEN 'vencido'
            ELSE 'vencido'
        END AS estatus,
        doc.CTOTAL total,
        doc.CPENDIENTE pendiente
    FROM admDocumentos doc
    INNER JOIN admFoliosDigitales folios ON folios.CIDDOCTO = doc.CIDDOCUMENTO
    INNER JOIN admClientes clientes ON clientes.CIDCLIENTEPROVEEDOR = doc.CIDCLIENTEPROVEEDOR
    WHERE doc.CIDDOCUMENTODE = 4 AND doc.CPENDIENTE > 0 AND DATEADD(DAY, clientes.CDIASCREDITOCLIENTE, doc.CFECHA) < @today
    ORDER BY doc.CFECHA ASC;
"""


def get_estado_cuenta(db) -> list[FacturaRow]:
    return db.fetchall(sql)
