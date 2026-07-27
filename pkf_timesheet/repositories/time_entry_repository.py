from odoo.api import Environment
from ..dtos import EntryRangeDTO


class TimeEntryRepository:

    def __init__(self, env: Environment):
        self.env = env
        self.model = env["pkf.timesheet.time.entry"]

    def get_entries(
        self, project_id: int, include_in_cost=True, start_date=None, end_date=None
    ):
        domain = [
            ("project_id", "=", project_id),
            ("task_id.include_in_cost", "=", include_in_cost),
        ]

        if start_date and end_date:
            domain += [("date", ">=", start_date), ("date", "<=", end_date)]

        return self.model.sudo().search(domain)

    def find_by_range_date(self, entry: EntryRangeDTO, employee_id: int):
        return self.model.search(
            [
                ("date", ">=", entry.start_date),
                ("date", "<=", entry.end_date),
                ("project_id", "=", entry.project_id),
                ("phase_id", "=", entry.phase_id),
                ("task_id", "=", entry.task_id),
                ("employee_id", "=", employee_id),
            ]
        )

    def save_bulk(self, entries: list[dict] | None = None):
        entries = entries or []

        for entry in entries:
            entry_id = entry.get("id")
            vals = {key: value for key, value in entry.items() if key != "id"}

            if entry_id and entry_id > 0:
                self.model.browse(entry_id).write(vals)
            else:
                r = self.model.create(vals)
                print(r)

        return True
