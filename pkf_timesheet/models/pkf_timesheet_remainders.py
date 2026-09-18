import logging
from dataclasses import dataclass
from odoo import models

_logger = logging.getLogger(__name__)


@dataclass
class UserProject:
    id: int
    email: str
    name: str
    projects: list

    @classmethod
    def from_basemodel(cls, obj: models.BaseModel) -> "UserProject":
        # Intentar obtener email desde res.users o hr.employee
        email = getattr(obj, "work_email", None) or getattr(obj, "email", None)
        return cls(id=obj.id, name=obj.name, email=email, projects=[])


class PKFTimesheetRemainders(models.AbstractModel):
    _name = "pkf.timesheet.remainders"
    _description = "PKF - Recordatorios Timesheet"

    def notify_fill_hours(self):
        _logger.info("Iniciando proceso de notificación de llenado de horas...")

        projects = self.env["pkf.timesheet.project"].search(
            [("state", "=", "in_progress")]
        )
        if not projects:
            _logger.info(
                "No se encontraron proyectos en progreso. No se enviarán notificaciones."
            )
            return

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

        mail_template = self.env.ref("pkf_timesheet.notify_fill_hours").sudo()
        for user in user_ids.values():
            if not user.email:
                _logger.warning(
                    "Usuario %s (ID %s) no tiene email configurado. Se omite envío.",
                    user.name,
                    user.id,
                )
                continue

            ctx = {
                "name": user.name,
                "projects": [{"name": pr.name} for pr in user.projects],
            }

            _logger.info(
                "Enviando notificación a %s (%s) con %d proyectos.",
                user.name,
                user.email,
                len(user.projects),
            )

            mail_template.with_context(ctx).send_mail(
                res_id=user.id,
                force_send=False,
                email_values={
                    "email_from": "PKF Monterrey <no-reply@pkfmty.com>",
                    "email_to": user.email,
                },
            )

        _logger.info("Proceso de notificación finalizado.")
        return
