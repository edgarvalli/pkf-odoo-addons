from odoo.api import Environment
from odoo.models import BaseModel
from collections import defaultdict
from ..timesheet_entry.repositories import TimeEntryRepository
from .builder import build_data


class TimesheetProject:

    def __init__(self, env: Environment):
        self.env = env
        self.model = env["pkf.timesheet.project"].sudo()
        self.entry_repo = TimeEntryRepository(env)

    def calculate_total_timesheet_cost(self, rec: BaseModel):

        entries = self.entry_repo.get_entries(rec.id)
        total_amount = 0

        hours_by_employee = defaultdict(float)

        for entry in entries:
            hours_by_employee[entry.employee_id.id] += entry.hours

        surcharge = 1 + (rec.cancellation_porcentage / 100)

        total_amount = sum(
            employee.timesheet_cost * surcharge * hours_by_employee[employee.id]
            for employee in rec.assigned_user_ids
        )

        rec.total_timesheet_cost_amount = total_amount

    def get_project_data(
        self,
        project_id: int,
        start_date: str | None = None,
        end_date: str | None = None,
    ):

        project = self.model.browse(project_id)

        if not project.exists():
            return None

        if start_date and end_date:
            entries = self.entry_repo.get_entries(
                project.id, True, start_date, end_date
            )

        return build_data(project, entries)
