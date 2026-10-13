import logging
from odoo import models
from ..dtos.users import UserProject

_logger = logging.getLogger(__name__)


class PKFTimesheetRemainders(models.AbstractModel):
    _name = "pkf.timesheet.remainders"
    _description = "PKF - Recordatorios Timesheet"

    def _build_user_ids(self, projects: models.Model) -> dict[int, UserProject]:
        user_ids: dict[int, UserProject] = {}

        for p in projects:
            _logger.debug("Procesando proyecto: %s (ID %s)", p.name, p.id)
            for user in p.assigned_user_ids:
                if user.id not in user_ids:
                    up = UserProject.from_basemodel(user)
                    user_ids[user.id] = up
                    _logger.debug(
                        "Usuario agregado: %s (ID %s, Email %s)",
                        up.name,
                        up.id,
                        up.email,
                    )
                user_ids[user.id].projects.append(p)
                _logger.debug("Proyecto %s asignado al usuario %s", p.name, user.name)

        return user_ids

    def _get_projects(self) -> models.Model:
        _logger.info("Obteniendo projectos en proceso....")
        projects = self.env["pkf.timesheet.project"].search(
            [("state", "=", "in_progress")]
        )

        if not projects:
            _logger.info("No se encontraron proyectos en progreso.")
            return self.env["pkf.timesheet.project"].browse([])

        return projects

    def _schedule_email(self, user: UserProject, ctx: dict):
        mail_template = self.env.ref("pkf_timesheet.notify_fill_hours").sudo()
        mail_template.with_context(ctx).send_mail(
            res_id=user.id,
            force_send=False,
            email_values={
                "email_from": "PKF Monterrey <no-reply@pkfmty.com>",
                "email_to": user.email,
            },
        )

    def notify_fill_hours(self):
        _logger.info("Iniciando proceso de notificación de llenado de horas...")

        projects = self._get_projects()
        user_ids = self._build_user_ids(projects)

        for user in user_ids.values():
            if not user.email:
                msg = f"Usuario {user.name} no tiene email configurado. Se omite envio."
                _logger.warning(msg)
                continue
            ctx = {
                "name": user.name,
                "projects": [{"name": pr.name} for pr in user.projects],
            }

            self._schedule_email(user, ctx)
