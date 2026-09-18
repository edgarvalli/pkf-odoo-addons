{
    "name": "Clientes Comercial PKF",
    "version": "1.0",
    "author": "Edgar Valli",
    "license": "LGPL-3",
    "description": "Aplicación para conectar los clientes de contpaqi comercial a Odoo",
    "depends": ["base", "web", "sale", "ev_tools", "ev_contpaqi", "pkf_app"],
    "assets": {
        "web.assets_backend": [
            "pkf_clientes/static/lib/estado_cuenta_dashboard.css",
            "pkf_clientes/static/src/components/**/*",
        ]
    },
    "data": [
        "templates/estado_cuenta_email_template.xml",
        "templates/envio_factura_template.xml",
        "templates/envio_pago_template.xml",
        "views/upload_invoices_view.xml",
        # "views/pkf_email_queue.xml",
        "views/hr_employee_view.xml",
        "data/groups.xml",
        "data/actions.xml",
        "data/menu.xml",
        "data/ir_cron.xml",
        "security/ir.model.access.csv",
    ],
}
