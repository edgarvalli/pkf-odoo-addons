import logging
from datetime import date
from odoo import fields, models

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

        _logger.warning(
            "Tipo de período no reconocido: %s",
            period_type,
        )
        return False

    def _run_update_dates(self, project: models.BaseModel):
        _logger.info(
            "Actualizando fechas del período del proyecto %s (%s). Tipo de período: %s",
            project.id,
            project.name,
            project.period_type,
        )

        dates = DatePeriod(project.period_type)

        project.write(
            {
                "period_start_date": dates.start_date,
                "period_end_date": dates.end_date,
            }
        )

        _logger.info(
            "Período actualizado correctamente para el proyecto %s (%s): %s - %s",
            project.id,
            project.name,
            dates.start_date,
            dates.end_date,
        )

    def _update_dates(self, force=False):
        today = fields.Date.today()

        _logger.info(
            "Iniciando actualización de períodos de proyectos. Fecha: %s. Forzar actualización: %s",
            today,
            force,
        )

        projects = self.env["pkf.timesheet.project"].search(
            [
                ("period_open", "=", False),
                ("state", "=", "in_progress"),
            ]
        )

        _logger.info(
            "Se encontraron %s proyectos candidatos para actualizar sus períodos.",
            len(projects),
        )

        updated_count = 0
        skipped_count = 0

        for project in projects:
            _logger.debug(
                "Evaluando proyecto %s (%s). Tipo de período: %s",
                project.id,
                project.name,
                project.period_type,
            )

            if force:
                self._run_update_dates(project)
                updated_count += 1
                continue

            if not self._is_period_start(project.period_type, today):
                _logger.debug(
                    "Se omite el proyecto %s (%s): hoy no corresponde al inicio de su período.",
                    project.id,
                    project.name,
                )
                skipped_count += 1
                continue

            self._run_update_dates(project)
            updated_count += 1

        _logger.info(
            "Actualización de períodos finalizada. Fecha: %s. "
            "Proyectos encontrados: %s. Actualizados: %s. Omitidos: %s. Forzar: %s.",
            today,
            len(projects),
            updated_count,
            skipped_count,
            force,
        )

    def run(self, force=False):
        _logger.info(
            "Ejecutando cron de control de tiempos de proyectos. Forzar: %s",
            force,
        )

        self._update_dates(force)

        _logger.info(
            "Finalizó la ejecución del cron de control de tiempos de proyectos."
        )
