from odoo.api import Environment


class HrExpenseRepository:

    def __init__(self, env: Environment):
        self.env = env
        self.model = env["hr.expense"]

    def get_by_project_id(self, project_id: int):
        domain = [
            ("pfk_timesheet_project_id", "=", project_id),
            ("state", "in", ["posted", "in_payment", "paid", "refused"]),
        ]
        return self.model.search(domain)
