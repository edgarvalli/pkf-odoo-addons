{
    "name": "Clientes Comercial PKF",
    "version": "1.0",
    "author": "Edgar Valli",
    "license": "LGPL-3",
    "description": "Aplicación para conectar los clientes de contpaqi comercial a Odoo",
    "depends": ["base", "sale", "ev_tools", "ev_contpaqi", "pkf_app"],
    "data": [
        "templates/estado_cuenta_email_template.xml",
        "templates/envio_factura_template.xml",
    ],
}
