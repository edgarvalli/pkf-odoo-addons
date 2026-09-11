import logging
from datetime import date
from odoo import models, fields
from ..domain import DatePeriod

_logger = logging.getLogger(__name__)


class PKFTimesheetProjectCron(models.AbstractModel):
    _name = "pkf.timesheet.project.cron"
    _description = "PKF - Control de tiempos proyecto"

    @staticmethod
    def _is_period_start(period_type: str, today: date) -> bool:
        if period_type == "weekly":
            return today.weekday() == 6

        if period_type == "biweekly":
            return today.day in (1, 16)

        if period_type == "monthly":
            return today.day == 1

        return False

    def _run_update_dates(self, project: models.BaseModel):
        dates = DatePeriod(project.period_type)
        project.write(
            {
                "period_start_date": dates.start_date,
                "period_end_date": dates.end_date,
            }
        )

        _logger.info(
            "Período actualizado para proyecto %s (%s): %s - %s",
            project.id,
            project.name,
            dates.start_date,
            dates.end_date,
        )

    def _update_dates(self, force=False):
        projects = self.env["pkf.timesheet.project"].search(
            [
                ("period_open", "=", False),
                ("state", "=", "in_progress"),
            ]
        )

        today = fields.Date.today()

        for project in projects:

            if force:
                self._run_update_dates(project)

            if not self._is_period_start(
                project.period_type,
                today,
            ):
                continue

            self._run_update_dates(project)

    def run(self, force=False):
        self._update_dates(force)
