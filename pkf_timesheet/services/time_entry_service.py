from odoo import fields
from datetime import timedelta, datetime
from odoo.api import Environment
from odoo.models import BaseModel
from ..repositories import TimeEntryRepository
from ..dtos import EntryRangeDTO


class TimeEntryService:

    def __init__(self, env: Environment):
        self.env = env
        self.repository = TimeEntryRepository(env)

    def _get_entries_between_dates(
        self, data: EntryRangeDTO, entries: BaseModel
    ) -> list[dict]:

        final_entries = []
        employee_id = self.env.user.employee_id.id
        current_date = data.start_date
        entries_by_date = {entry.date: entry for entry in entries}

        while current_date <= data.end_date:
            entry = {
                "id": None,
                "employee_id": employee_id,
                "task_id": data.task_id,
                "project_id": data.project_id,
                "phase_id": data.phase_id,
                "date": current_date,
                "hours": data.hours,
                "note": data.note,
            }

            exists = entries_by_date.get(current_date)

            if exists:
                entry["id"] = exists.id

            final_entries.append(entry)
            current_date += timedelta(days=1)
        return final_entries

    def save_range_hours(self, entry_dict: dict):

        data = EntryRangeDTO.from_dict(entry_dict)
        employee_id = self.env.user.employee_id.id
        entries = self.repository.find_by_range_date(data, employee_id)

        final_entries = self._get_entries_between_dates(data, entries)
        result = self.save_bulk(data.project_id, final_entries)

        if result:
            self.recalculate_projects(final_entries)

        return result

    def save_bulk(self, project_id: int = None, entries: list[dict] = None):

        if not project_id:
            return

        model = self.env["pkf.timesheet.project"]
        project = model.search([("id", "=", project_id)], limit=1)

        if not project:
            return

        for entry in entries:
            date = entry.get("date")
            if not date or isinstance(date, datetime):
                continue

            entry["date"] = fields.Date.from_string(date)

        if not project.period_open:
            entries = [
                entry
                for entry in entries
                if (
                    project.period_start_date
                    <= entry["date"]
                    <= project.period_end_date
                )
            ]

        return self.repository.save_bulk(entries)

    def recalculate_projects(self, entries: list[dict]):
        project_ids = {
            entry.get("project_id") for entry in entries if entry.get("project_id")
        }

        if not project_ids:
            return

        projects = self.env["pkf.timesheet.project"].browse(list(project_ids))

        projects._compute_total_hours()
        projects._compute_total_spend()
