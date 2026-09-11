from odoo.api import Environment
from odoo.models import BaseModel
from ...dtos import EntryRangeDTO
from .builder import build_entries_between_dates
from .utils import normalize_entry_dates, build_biweekly_dates
from ...repositories import TimeEntryRepository, TimesheetProjectRepository


class TimeEntryService:

    def __init__(self, env: Environment):
        self.model = env["pkf.timesheet.time.entry"]
        self.employee_id: int = env.user.employee_id.id
        self.company_name = env.company.name
        self.company_logo = env.company.logo
        self.repository = TimeEntryRepository(env)
        self.project_repo = TimesheetProjectRepository(env)

    def _filter_entries_by_period(self, project: dict, entries: list[dict]):

        period_open = project.get("period_open", False)
        if period_open:
            return entries

        return [
            entry
            for entry in entries
            if (
                project.get("period_start_date")
                <= entry["date"]
                <= project.get("period_end_date")
            )
        ]

    def _build_project(self, entry: BaseModel) -> dict:
        project: BaseModel = entry.project_id

        dates = None
        if not project:
            dates = build_biweekly_dates()

        return {
            "id": project.id if project else None,
            "name": project.name if project else "No cargable",
            "period_open": project.period_open if project else False,
            "period_type": project.period_type if project else "biweekly",
            "period_start_date": project.period_start_date if project else dates.start,
            "period_end_date": project.period_end_date if project else dates.end,
            "is_not_cargable": project is None,
            "partner": {
                "id": project.partner_id.id if project else None,
                "name": project.partner_id.name if project else self.company_name,
                "avatar_128": (
                    project.partner_id.avatar_128 if project else self.company_logo
                ),
            },
        }

    def save_range_hours(self, entry_dict: dict):

        data = EntryRangeDTO.from_dict(entry_dict)

        if data.is_not_cargable:
            entries = self.repository.find_by_range_date_no_cargable(
                data, self.employee_id
            )

        else:
            entries = self.repository.find_by_range_date(data, self.employee_id)

        final_entries = build_entries_between_dates(data, entries, self.employee_id)
        project_id = None if data.is_not_cargable else data.project_id
        result = self.save_bulk(final_entries, project_id)

        if result:
            self.recalculate_projects(final_entries)

        return result

    def get_by_user(self, startdate, enddate):
        domain = [
            ("employee_id", "=", self.employee_id),
            ("date", ">=", startdate),
            ("date", "<=", enddate),
        ]

        entries_orm = self.model.search(domain)

        entries = []
        for entry in entries_orm:
            vals = {
                "create_date": entry.create_date,
                "id": entry.id,
                "employee_id": entry.employee_id.id,
                "task": {"id": entry.task_id.id, "name": entry.task_id.name},
                "phase": {"id": entry.phase_id.id, "name": entry.phase_id.name},
                "date": entry.date,
                "hours": entry.hours,
                "note": entry.note,
                "project": self._build_project(entry),
            }
            entries.append(vals)
        return entries

    def save_bulk(self, entries: list[dict], project_id: int = None):

        if project_id is None or project_id == 0:
            project = {"period_open": True}
        else:
            project = self.project_repo.get_by_id(project_id)

        if not project:
            return

        entries = normalize_entry_dates(entries)
        entries = self._filter_entries_by_period(project, entries)

        return self.repository.save_bulk(entries)

    def recalculate_projects(self, entries: list[dict]):
        project_ids = {
            entry.get("project_id") for entry in entries if entry.get("project_id")
        }

        if not project_ids:
            return

        projects = self.project_repo.browse_ids(list(project_ids))

        projects._compute_total_hours()
        projects._compute_total_spend()

    def totalize_entries_by_date(self, startdate, enddate):
        if startdate is None or enddate is None:
            return []

        domain = [
            ("employee_id", "=", self.employee_id),
            ("date", ">=", startdate),
            ("date", "<=", enddate),
        ]

        entries = self.model.search(domain)
        entries_by_project = {}

        for entry in entries:
            project_id = entry.project_id.id
            cursor = entries_by_project.setdefault(
                project_id,
                {
                    "id": entry.project_id.id,
                    "name": entry.project_id.name,
                    "period_open": entry.project_id.period_open,
                    "period_type": entry.project_id.period_type,
                    "period_start_date": entry.project_id.period_start_date,
                    "period_end_date": entry.project_id.period_end_date,
                    "partner": {
                        "id": entry.project_id.partner_id.id,
                        "name": entry.project_id.partner_id.name,
                        "avatar_128": entry.project_id.partner_id.avatar_128,
                    },
                    "total_hours": {},
                    "total_hours_no_cost": {},
                },
            )
            date_key = entry.date.strftime("%Y-%m-%d")
            cursor = (
                cursor["total_hours"]
                if entry.task_id.include_in_cost
                else cursor["total_hours_no_cost"]
            )
            cursor[date_key] = cursor.get(date_key, 0) + float(entry.hours)

        return list(entries_by_project.values())
