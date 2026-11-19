from odoo.api import Environment
from odoo.models import Model
from .models import Metadata


class MetadataService:

    def __init__(self, env: Environment):
        self.env = env
        self.model = env["pkf.timesheet.project"]
        self.model_entry = env["pkf.timesheet.time.entry"]
        self.model_employee = env["hr.employee"]

    def get_projects(self) -> list[dict]:
        return self.model.search_projects_by_user()

    def get_subordinates(self) -> Model:
        employee = self.env.user.employee_id

        if not employee:
            return self.model_employee.browse()

        return self.model_employee.search([("parent_id", "=", employee.id)])

    def get_entries(self) -> Model:
        employees = self.get_subordinates()

        return self.model_entry.search([("employee_id", "in", [1])])
        # return self.model_entry.search([("employee_id", "in", employees.ids)])

    def parse_projects(self, entries: Model, entries_data: list[dict]) -> list[dict]:

        projects = {}
        entries_by_id = {entry["id"]: entry for entry in entries_data}

        for entry in entries:
            project = entry.project_id

            if not project:
                continue

            projects.setdefault(
                project.id,
                {
                    "id": project.id,
                    "name": project.name,
                    "code": project.code,
                    "total_hours": 0,
                    "entries": [],
                },
            )

            p = projects[project.id]
            p["entries"].append(entries_by_id[entry.id])
            p["total_hours"] += entry.hours

        return list(projects.values())

    def get(self) -> Metadata:
        entries = self.get_entries()
        entries_data = entries.read()

        return Metadata(
            projects=self.parse_projects(entries, entries_data),
            entries=entries_data,
            total_hours=sum(entries.mapped("hours")),
        )
