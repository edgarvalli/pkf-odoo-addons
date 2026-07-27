from datetime import datetime
from odoo import models, fields
from ..domain import DatePeriod


class PKFTimesheetProjectCronService(models.AbstractModel):
    _name = "pkf.timesheet.project.cron.service"
    _description = "PKF Control de tiempos - Proyecto Servicio"

    def _is_period_start(self, period_type, today: datetime):
        if period_type == "weekly":
            return today.weekday() == 6

        if period_type == "biweekly":
            return today.day in (1, 16)

        if period_type == "monthly":
            return today.day == 1

        return False

    def _update_dates(self):
        model = self.env["pkf.timesheet.project"]

        domain = [("period_open", "=", False), ("state", "=", "in_progress")]
        projects = model.search(domain)

        today = fields.Date.today()
        for project in projects:
            if not self._is_period_start(project.period_type, today):
                continue

            dates = DatePeriod(project.period_type)
            vals = {
                "period_start_date": dates.start_date,
                "period_end_date": dates.end_date,
            }
            project.write(vals)

    def cron_process(self):
        return self._update_dates()
