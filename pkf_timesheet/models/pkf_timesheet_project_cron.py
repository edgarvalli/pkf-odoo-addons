import logging
from odoo import fields, models

from ..domain import DatePeriod

_logger = logging.getLogger(__name__)


class PKFTimesheetProjectCron(models.AbstractModel):
    _name = "pkf.timesheet.project.cron"
    _description = "PKF - Control de tiempos proyecto"

    def _run_update_dates(self, project, today):
        dates = DatePeriod(project.period_type, today)

        current_start = project.period_start_date
        current_end = project.period_end_date

        if current_start == dates.start_date and current_end == dates.end_date:
            _logger.debug(
                "Proyecto %s (%s): las fechas ya están actualizadas (%s - %s).",
                project.id,
                project.name,
                current_start,
                current_end,
            )
            return False

        _logger.info(
            "Actualizando proyecto %s (%s). Tipo: %s. "
            "Período anterior: %s - %s. Nuevo período: %s - %s.",
            project.id,
            project.name,
            project.period_type,
            current_start,
            current_end,
            dates.start_date,
            dates.end_date,
        )

        project.write(
            {
                "period_start_date": dates.start_date,
                "period_end_date": dates.end_date,
            }
        )

        _logger.info(
            "Proyecto %s (%s) actualizado correctamente.",
            project.id,
            project.name,
        )

        return True

    def _update_dates(self):
        today = fields.Date.today()

        _logger.info(
            "Iniciando actualización de períodos. Fecha: %s.",
            today,
        )

        projects = self.env["pkf.timesheet.project"].search(
            [
                ("period_open", "=", False),
                ("state", "=", "in_progress"),
            ]
        )

        _logger.info(
            "Proyectos candidatos encontrados: %s.",
            len(projects),
        )

        updated_count = 0
        unchanged_count = 0

        for project in projects:
            try:
                updated = self._run_update_dates(project, today)

                if updated:
                    updated_count += 1
                else:
                    unchanged_count += 1

            except ValueError:
                _logger.exception(
                    "Error al calcular el período del proyecto %s (%s).",
                    project.id,
                    project.name,
                )
                raise

        _logger.info(
            "Actualización finalizada. Fecha: %s. "
            "Encontrados: %s. Actualizados: %s. Sin cambios: %s.",
            today,
            len(projects),
            updated_count,
            unchanged_count,
        )

    def run(self):
        _logger.info("Ejecutando cron de control de tiempos de proyectos.")

        self._update_dates()

        _logger.info("Finalizó la ejecución del cron de control de tiempos.")
