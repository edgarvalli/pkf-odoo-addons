{
    "name": "PKF Solicitud de Facturas",
    "version": "1.0",
    "author": "Edgar Valli",
    "license": "LGPL-3",
    "category": "PKF",
    "summary": "Modulo para solicitar facturas a departamento de Cobranza",
    "description": """
        Modulo para solicitar facturas a departamento de Cobranza
    """,
    "depends": ["base", "mail", "sale", "pkf_app"],
    "data": [
        # Seguridad y accesos
        "security/ir.model.access.csv",
        "data/groups.xml",
        "data/rules.xml",
        # Data
        "data/ir_sequence_data.xml",
        # Menús y acciones
        "data/actions.xml",
        "data/menu.xml",
        # Views
        "views/sale_order.xml",
        "views/solicitud_factura_form.xml",
        "views/solicitud_factura_list.xml",
        # Plantillas de correo
        "templates/pkf_email_template.xml",
    ],
    "assets": {
        "web.assets_backend": [
            # Aquí puedes incluir JS/CSS si los necesitas
        ]
    },
    "installable": True,
    "application": True,
}
