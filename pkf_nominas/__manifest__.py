# Se necesita instalar las siguientes paqueterias
# pyodbc
# qrcode

{
    "name": "Nominas PKF",
    "version": "1.0",
    "category": "CRM",
    "author": "Edgar Valli",
    "license": "LGPL-3",
    "summary": "Modulo para obtener los recibos de nominas de los empleados del PKF",
    "depends": ["base", "web", "hr", "ev_tools", "ev_contpaqi", "pkf_app"],
    "data": [
        "templates/recibo_nomina_template.xml",
        "templates/comprobante_nomina_template.xml",
        "data/actions.xml",
        "data/menu.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "pkf_nominas/static/src/js/**/*",
            "pkf_nominas/static/src/xml/**/*",
            "pkf_nominas/static/src/scss/**/*",
        ]
    },
    "external_dependencies": {"python": ["num2words", "qrcode"]},
    "installable": True,
    "auto_install": False,
}
