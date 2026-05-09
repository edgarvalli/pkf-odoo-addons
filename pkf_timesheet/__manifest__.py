{
    "name": "PKF Control de Tiempos",
    "version": "1.0",
    "author": "Edgar Valli",
    "license": "LGPL-3",
    "description": """
        Aplicacion para control de tiempos de las actividades de los empleados
    """,
    "depends": ["base", "web", "hr", "hr_expense"],
    "data": [
        "data/groups.xml",
        "security/ir.model.access.csv",
        "views/project_view.xml",
        "views/hr_employee.xml",
        "views/hr_expense.xml",
        "views/phase_view.xml",
        "views/task_view.xml",
        "views/time_entry.xml",
        "data/actions.xml",
        "data/menu.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "pkf_timesheet/static/src/main.js",
            "pkf_timesheet/static/src/utils/**/*.js",
            "pkf_timesheet/static/src/actions/**/*",
            "pkf_timesheet/static/src/widgets/**/*",
        ]
    },
}
