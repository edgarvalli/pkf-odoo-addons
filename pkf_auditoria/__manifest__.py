{
    "name": "PKF Auditoria",
    "version": "1.0",
    "author": "Edgar Valli",
    "license": "LGPL-3",
    "description": """
        Aplicacion para modulos de Auditoria
        dentro de la Firma PKF
    """,
    "depends": ["base", "mail", "pkf_timesheet"],
    "data": [
        "views/pkf_contribuyente_views.xml",
        "views/pkf_contribuyente_group_views.xml",
        "data/actions.xml",
        "data/menu.xml",
        "data/ir_rule.xml",
        "security/ir.model.access.csv",
        "template/mail_template_data.xml",
        "data/ir_cron.xml",
        "views/res_config_settings_views.xml",
    ],
}
