from odoo.api import Environment
from odoo.models import BaseModel
from collections import defaultdict
from ..repositories import TimeEntryRepository


class ProjectService:

    def __init__(self, env: Environment):
        self.env = env
        self.model = env["pkf.timesheet.project"]
        self.entry_repo = TimeEntryRepository(env)

    def _build_tasks(self, task_ids: BaseModel, entries_by_task: dict):
        task_fields = ["id", "code", "name", "order", "estimated_hours"]
        tasks_list = []
        # Leemos los datos de todas las tareas del recordset de una sola vez
        for task in task_ids:
            task_data = {field: task[field] for field in task_fields}
            # Asignamos las entradas pre-procesadas para evitar búsquedas repetitivas
            task_data["entries"] = entries_by_task.get(task.id, {})
            tasks_list.append(task_data)

        return tasks_list

    def _build_entry_tasks(self, project: BaseModel, start_date, end_date) -> dict:
        entries_by_task = {}

        all_entries = self.entry_repo.get_entries(
            project.id, True, start_date, end_date
        )

        for entry in all_entries:
            t_id = entry.task_id.id
            entry_record = {
                "id": entry.id,
                "date": entry.date,
                "hours": entry.hours,
                "project_id": entry.project_id.id,
                "phase_id": entry.phase_id.id,
                "task_id": entry.task_id.id,
            }

            entries_by_task.setdefault(t_id, {})[str(entry.date)] = entry_record

        return entries_by_task

    def _build_phases(self, project: BaseModel, start_date, end_date):

        # --- OPTIMIZACIÓN: Pre-procesar todas las entradas del proyecto ---

        entries_by_task = {}
        if start_date and end_date:
            entries_by_task = self._build_entry_tasks(project, start_date, end_date)
        # ---------------------------------------------------------------

        return [
            {
                "id": phase.id,
                "name": phase.name,
                "tasks": self._build_tasks(phase.task_ids, entries_by_task),
            }
            for phase in project.phase_ids
            if phase.active
        ]

    def _build_data(self, project: BaseModel, start_date, end_date):
        # Acceso directo a relaciones (Odoo usa cache)
        return {
            "id": project.id,
            "name": project.name,
            "note": project.note,
            "period": {
                "open": project.period_open,
                "type": project.period_type,
                "startDate": project.period_start_date,
                "endDate": project.period_end_date,
            },
            "client": {
                "id": project.partner_id.id,
                "name": project.partner_id.name,
                "avatar": project.partner_id.avatar_128,
            },
            "phases": self._build_phases(project, start_date, end_date),
        }

    def get_project_data(
        self,
        project_id: int,
        start_date: str | None = None,
        end_date: str | None = None,
    ):

        project = self.model.browse(project_id)
        if not project.exists():
            return None

        return self._build_data(project, start_date, end_date)

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
