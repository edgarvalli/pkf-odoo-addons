from odoo.api import Environment, DomainType


class TimesheetProjectRepository:

    def __init__(self, env: Environment):
        self.model = env["pkf.timesheet.project"]

    def _search(self, domain=[], include_phases=False, limit=None):
        projects = self.model.search(domain, limit=limit)
        result = []

        for project in projects:

            phases = []

            if include_phases:
                for phase in project.phase_ids:
                    tasks = [{"id": t.id, "name": t.name} for t in phase.task_ids]
                    phases.append({"id": phase.id, "name": phase.name, "tasks": tasks})

            result.append(
                {
                    "id": project.id,
                    "name": project.name,
                    "note": project.note,
                    "phases": phases,
                    "partner": project.partner_id.read(["id", "name", "avatar_128"])[0],
                    "period_open": project.period_open,
                    "period_type": project.period_type,
                    "period_start_date": project.period_start_date,
                    "period_end_date": project.period_end_date,
                }
            )

        return result

    def get_by_id(self, id: int, include_phases=False) -> dict:
        result = self._search([("id", "=", id)], include_phases=include_phases, limit=1)

        if not result:
            return None

        return result[0]

    def browse_ids(self, ids: list[int]):
        return self.model.browse(ids)

    def search_projects_by_user(self, employee_ids, value: str = None, **kwargs):
        domain = [
            ("assigned_user_ids", "in", employee_ids),
            ("state", "=", "in_progress"),
        ]

        if value:
            domain.append(("name", "ilike", value))

        include_phases = kwargs.pop("include_phases")

        return self._search(domain, include_phases)

    def search(
        self,
        domain: DomainType,
        offset: int = None,
        limit: int = None,
        order: int = None,
    ):
        return self.model.search(domain, offset, limit, order)
