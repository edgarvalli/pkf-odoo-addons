from odoo import fields
from typing import Literal


class DatePeriod:
    def __init__(self, period_type: Literal["weekly", "biweekly", "monthly"]):
        self.today = fields.Date.today()
        self.start_date: fields.Date
        self.end_date: fields.Date

        periods = {
            "weekly": self._set_weekly,
            "biweekly": self._set_biweekly,
            "monthly": self._set_monthly,
        }

        try:
            periods[period_type]()
        except KeyError:
            raise ValueError(f"El tipo de periodo '{period_type}' no es correcto.")

    def _set_weekly(self):
        self.start_date = fields.Date.start_of(self.today, "week")
        self.end_date = fields.Date.end_of(self.today, "week")

        return self

    def _set_biweekly(self):
        if self.today.day <= 15:
            self.start_date = self.today.replace(day=1)
            self.end_date = self.today.replace(day=15)
        else:
            self.start_date = self.today.replace(day=16)
            self.end_date = fields.Date.end_of(self.today, "month")

        return self

    def _set_monthly(self):
        self.start_date = self.today.replace(day=1)
        self.end_date = fields.Date.end_of(self.today, "month")
