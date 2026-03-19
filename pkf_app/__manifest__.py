{
    "name": "PKF App",
    "version": "1.0",
    "author": "Edgar Valli",
    "license": "LGPL-3",
    "description": """
        Aplicacion para control interno de PKF
        Se conecta a la aplicacion de contpaqi
    """,
    "depends": ["base", "ev_tools", "ev_contpaqi", "pkf_nominas", "pkf_clientes"],
    "data": [
        "data/actions.xml",
        "data/menu.xml",
        "views/pkf_app_menu.xml",
        "views/pkf_app_fronted.xml",
        "data/pkf.app.menu.csv",
        "security/ir.model.access.csv",
    ],
    "assets": {
        "web.assets_backend": ["pkf_app/static/lib/fontawesome/css/all.min.css"]
    },
}
