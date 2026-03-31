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
    "depends": ["base", "hr", "ev_tools", "ev_contpaqi", "pkf_app"],
    "data": [
        "views/res_company_contpaqi.xml",
        "templates/recibo_nomina_template.xml",
        "templates/comprobante_nomina_template.xml",
        "data/actions.xml",
    ],
    "external_dependencies": {"python": ["num2words", "qrcode"]},
    "installable": True,
    "auto_install": False,
}
