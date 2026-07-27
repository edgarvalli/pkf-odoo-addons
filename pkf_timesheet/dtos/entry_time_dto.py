from dataclasses import dataclass

from odoo import fields
from odoo.exceptions import UserError


@dataclass
class EntryRangeDTO:

    project_id: int
    phase_id: int
    task_id: int
    hours: float
    start_date: fields.Date
    end_date: fields.Date
    note: str

    @classmethod
    def from_dict(cls, data: dict):

        start_str = data.get("startdate")
        end_str = data.get("enddate")

        if not start_str or not end_str:
            raise UserError("Debe de enviar una fecha inicial y final.")

        return cls(
            project_id=data.get("project_id", 0),
            phase_id=data.get("phase_id", 0),
            task_id=data.get("task_id", 0),
            hours=float(data.get("hours", 0)),
            start_date=fields.Date.to_date(start_str),
            end_date=fields.Date.to_date(end_str),
            note=data.get("note", ""),
        )
