from odoo.models import BaseModel


def build_data(project: BaseModel, entries: BaseModel):
    # Acceso directo a relaciones (Odoo usa cache)
    entries_by_task = build_entry_tasks(entries)
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
        "phases": build_phases(project, entries_by_task) or [],
    }


def build_phases(project: BaseModel, entries_by_task):

    entries_by_task = entries_by_task or {}

    return [
        {
            "id": phase.id,
            "name": phase.name,
            "tasks": build_tasks(phase.task_ids, entries_by_task),
        }
        for phase in project.phase_ids
        if phase.active
    ]


def build_tasks(task_ids: BaseModel, entries_by_task: dict):
    task_fields = ["id", "code", "name", "order", "estimated_hours"]
    return [
        {
            **{field: task[field] for field in task_fields},
            "entries": entries_by_task.get(task.id, {}),
        }
        for task in task_ids
    ]


def build_entry_tasks(entries: BaseModel) -> dict:
    entries_by_task = {}

    for entry in entries:
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
