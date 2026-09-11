from odoo import fields
from datetime import datetime, date
from dataclasses import dataclass


@dataclass
class DateRange:
    start: date
    end: date


def normalize_entry_dates(entries: list[dict]) -> list[dict]:
    for entry in entries:
        date = entry.get("date")

        if not date or isinstance(date, datetime):
            continue

        entry["date"] = fields.Date.from_string(date)

    return entries


def build_biweekly_dates() -> DateRange:
    today = date.today()
    start_date: date = None
    end_date: date = None

    if today.day <= 15:
        start_date = date(today.year, today.month, 1)
        end_date = date(today.year, today.month, 15)
    else:
        start_date = date(today.year, today.month, 16)
        end_date = date(today.year, today.month + 1, 0)

    return DateRange(start_date, end_date)
