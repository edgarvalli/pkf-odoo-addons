from odoo.api import Environment
from odoo.models import BaseModel


class ProjectService:

    def __init__(self, env: Environment, project_id: int):
        self.env = env
        self.id = project_id
        # Inicializamos las fechas para evitar AttributeError
        self.startdate = None
        self.enddate = None

    def _get_entries(self, ignore_dates=False):
        domain = [("project_id", "=", self.id)]

        # Quitamos el filtro de user_id para que el costo sea TOTAL
        if not ignore_dates:
            if self.startdate and self.enddate:
                domain += [
                    ("date", ">=", self.startdate),
                    ("date", "<=", self.enddate),
                ]
            else:
                # Si no hay fechas y no ignoramos fechas, retornamos vacío
                return self.env["pkf.timesheet.time.entry"]

        return self.env["pkf.timesheet.time.entry"].sudo().search(domain)

    def _build_tasks(
        self, task_ids: BaseModel, task_fields: list[str], entries_by_task: dict
    ):
        tasks_list = []
        # Leemos los datos de todas las tareas del recordset de una sola vez
        for task in task_ids:
            task_data = {field: task[field] for field in task_fields}
            # Asignamos las entradas pre-procesadas para evitar búsquedas repetitivas
            task_data["entries"] = entries_by_task.get(task.id, {})
            tasks_list.append(task_data)

        return tasks_list

    def _build_phases(self, phases: BaseModel):
        task_fields = ["id", "code", "name", "order", "estimated_hours"]

        # --- OPTIMIZACIÓN: Pre-procesar todas las entradas del proyecto ---
        all_entries = self._get_entries()
        entries_by_task = {}
        for entry in all_entries:
            t_id = entry.task_id.id
            if t_id not in entries_by_task:
                entries_by_task[t_id] = {}

            entries_by_task[t_id][str(entry.date)] = {
                "id": entry.id,
                "date": entry.date,
                "hours": entry.hours,
                "project_id": entry.project_id.id,
                "phase_id": entry.phase_id.id,
                "task_id": entry.task_id.id,
            }
        # ---------------------------------------------------------------

        return [
            {
                "id": phase.id,
                "name": phase.name,
                "tasks": self._build_tasks(
                    phase.task_ids, task_fields, entries_by_task
                ),
            }
            for phase in phases
            if phase.active
        ]

    def _build_data(self, project: BaseModel):
        # Acceso directo a relaciones (Odoo usa cache)
        return {
            "id": project.id,
            "name": project.name,
            "client": {
                "id": project.client_id.id,
                "name": project.client_id.name,
                "avatar": project.client_id.avatar_128,
            },
            "phases": self._build_phases(project.phase_ids),
        }

    def get_project_data(self, startdate: str, enddate: str):
        if not startdate or not enddate:
            return None

        project = self.env["pkf.timesheet.project"].browse(self.id)
        if not project.exists():
            return None

        self.startdate = startdate
        self.enddate = enddate

        return self._build_data(project)
