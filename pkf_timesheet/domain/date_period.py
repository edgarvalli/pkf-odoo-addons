from datetime import date
from typing import Literal

from odoo import fields

PeriodType = Literal["weekly", "biweekly", "monthly"]


class DatePeriod:
    def __init__(self, period_type: PeriodType, today: date | None = None):
        self.today = today or fields.Date.today()

        periods = {
            "weekly": self._set_weekly,
            "biweekly": self._set_biweekly,
            "monthly": self._set_monthly,
        }

        calculate_period = periods.get(period_type)

        if calculate_period is None:
            raise ValueError(f"El tipo de período '{period_type}' no es válido.")

        calculate_period()

    def _set_weekly(self) -> None:
        self.start_date = fields.Date.start_of(self.today, "week")
        self.end_date = fields.Date.end_of(self.today, "week")

    def _set_biweekly(self) -> None:
        if self.today.day <= 15:
            self.start_date = self.today.replace(day=1)
            self.end_date = self.today.replace(day=15)
        else:
            self.start_date = self.today.replace(day=16)
            self.end_date = fields.Date.end_of(self.today, "month")

    def _set_monthly(self) -> None:
        self.start_date = self.today.replace(day=1)
        self.end_date = fields.Date.end_of(self.today, "month")
