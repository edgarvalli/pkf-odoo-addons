{
    "name": "PKF Control de Tiempos",
    "version": "1.0",
    "author": "Edgar Valli",
    "license": "LGPL-3",
    "description": """
        Aplicacion para control de tiempos de las actividades de los empleados
    """,
    "depends": ["base", "web", "hr", "hr_expense", "contacts"],
    "data": [
        "data/groups.xml",
        "data/actions.xml",
        "security/ir.model.access.csv",
        "views/project_view.xml",
        "views/hr_employee.xml",
        "views/hr_expense.xml",
        "views/phase_view.xml",
        "views/task_view.xml",
        "views/time_entry.xml",
        "views/phase_groups_view.xml",
        "views/res_partner_view.xml",
        "views/project_import_form.xml",
        "data/menu.xml",
        "data/phases_task_data.xml",
        "data/ir_cron.xml",
        "data/ir_rule.xml",
        "templates/notify_fill_hours.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "pkf_timesheet/static/src/main.js",
            "pkf_timesheet/static/src/utils/**/*.js",
            "pkf_timesheet/static/src/components/**/*",
            "pkf_timesheet/static/lib/timesheet.css",
        ]
    },
}
