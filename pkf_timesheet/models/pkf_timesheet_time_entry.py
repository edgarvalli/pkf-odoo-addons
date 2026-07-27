from odoo import models, fields
from ..services import TimeEntryService
from ..repositories import TimeEntryRepository


class PKFTimeSheetTimeEntry(models.Model):
    _name = "pkf.timesheet.time.entry"
    _description = "PKF - Timesheet Entry"
    _order = "date"
    _rec_name = "project_id"

    employee_id = fields.Many2one(
        "hr.employee",
        required=True,
        readonly=True,
        default=lambda self: self.env.user.employee_id,
    )
    task_id = fields.Many2one("pkf.timesheet.project.task", required=True)
    project_id = fields.Many2one("pkf.timesheet.project")
    phase_id = fields.Many2one("pkf.timesheet.project.phase")
    date = fields.Date(required=True)
    hours = fields.Float(required=True)
    note = fields.Text("Notas")

    def save_range_hours(self, entry_dict: dict):
        repo = TimeEntryService(self.env)
        return repo.save_range_hours(entry_dict)

    def save_bulk(self, entries: list[dict] = [], project_id: int = None):
        """Save all entries or update and recalculate project totals"""

        response = {"error": False, "message": "ok"}
        try:
            srv = TimeEntryService(self.env)
            result = srv.save_bulk(project_id, entries)
            if not result:
                response = {"error": True, "message": "Ocurrio un error al guardar."}
        except Exception as e:
            print(e)
            response = {"error": True, "message": str(e)}

        finally:
            return response
