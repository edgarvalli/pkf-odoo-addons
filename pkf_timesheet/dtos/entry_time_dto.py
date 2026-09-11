from dataclasses import dataclass
from datetime import date

from odoo import fields


@dataclass
class EntryRangeDTO:

    project_id: int
    phase_id: int
    task_id: int
    hours: float
    start_date: date
    end_date: date
    note: str
    is_not_cargable: bool

    @property
    def is_range_date_valid(self) -> bool:
        return self.start_date <= self.end_date

    @classmethod
    def from_dict(cls, data: dict):

        start_str = data.get("start_date")
        end_str = data.get("end_date")

        # if not start_str or not end_str:
        #     raise UserError("Debe de enviar una fecha inicial y final.")

        return cls(
            project_id=data.get("project_id", 0),
            phase_id=data.get("phase_id", 0),
            task_id=data.get("task_id", 0),
            hours=float(data.get("hours", 0)),
            start_date=fields.Date.from_string(start_str),
            end_date=fields.Date.from_string(end_str),
            note=data.get("note", ""),
            is_not_cargable=data.get("isNotCargable", False),
        )
