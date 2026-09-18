from odoo import fields
from datetime import date as date_model
from dataclasses import dataclass


@dataclass
class EntryValue:
    id: int
    employee_id: int
    task_id: int
    project_id: int
    phase_id: int
    date: date_model
    hours: float
    note: str

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "employee_id": self.employee_id,
            "task_id": self.task_id,
            "project_id": self.project_id,
            "phase_id": self.phase_id,
            "date": self.date,
            "hours": self.hours,
            "note": self.note,
        }


@dataclass
class EntryDate:
    date: date_model
    entries: list[EntryValue]
    key: str

    @classmethod
    def from_dict(cls, values: dict) -> "EntryDate":
        return cls(
            key=values.get("date").strftime("%Y%m%d"),
            date=values.get("date"),
            entries=[],
        )


@dataclass
class EntryRangeDTO:

    project_id: int
    phase_id: int
    task_id: int
    hours: float
    start_date: date_model
    end_date: date_model
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
