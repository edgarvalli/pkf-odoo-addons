from datetime import timedelta
from odoo.models import BaseModel
from ...dtos import EntryRangeDTO


def totalize_entries_by_date(entries: BaseModel):
    entries_by_date = {}

    for entry in entries:
        key = entry.date
        entries_by_date[key] = entries_by_date.get(key, 0) + entry.hours

    return entries_by_date


def build_entries_between_dates(
    data: EntryRangeDTO,
    entries: BaseModel,
    employee_id: int,
) -> list[dict]:
    entries_by_date = {entry.date: entry for entry in entries}
    entries_total = totalize_entries_by_date(entries)

    result = []
    current_date = data.start_date

    while current_date <= data.end_date:
        existing = entries_by_date.get(current_date)
        total = entries_total.get(current_date, 0)

        if total < 24:
            hours_dif = total + data.hours
            hours = data.hours if hours_dif <= 24 else (24 - total)

            result.append(
                {
                    "id": existing.id if existing else None,
                    "employee_id": employee_id,
                    "task_id": data.task_id,
                    "project_id": data.project_id,
                    "phase_id": data.phase_id,
                    "date": current_date,
                    "hours": hours,
                    "note": data.note,
                }
            )

        current_date += timedelta(days=1)

    return result
