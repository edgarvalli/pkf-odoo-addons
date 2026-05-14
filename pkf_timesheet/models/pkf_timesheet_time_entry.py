from odoo import models, fields
from datetime import datetime, timedelta


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
        # Usamos una copia para no alterar el dict original por referencia
        data = entry_dict.copy()

        start_str = data.pop("startdate", None)
        end_str = data.pop("enddate", None)

        if not start_str or not end_str:
            return False

        # Odoo prefiere usar sus propias utilidades de fecha
        startdate = fields.Date.to_date(start_str)
        enddate = fields.Date.to_date(end_str)

        # Generamos las fechas del rango
        date_list = []
        curr = startdate
        while curr <= enddate:
            date_list.append(curr)
            curr += timedelta(days=1)

        final_entries = []
        for d in date_list:
            # Buscamos si ya existe una entrada para esta combinación exacta
            # Tip: Podrías optimizar buscando todo el rango de una vez fuera del loop
            existing = self.search(
                [
                    ("date", "=", d),
                    ("project_id", "=", data.get("project_id")),
                    ("phase_id", "=", data.get("phase_id")),
                    ("task_id", "=", data.get("task_id")),
                    (
                        "employee_id",
                        "=",
                        self.env.user.employee_id.id,
                    ),  # Filtramos por empleado actual
                ],
                limit=1,
            )

            entry_to_save = data.copy()
            entry_to_save["date"] = d
            if existing:
                entry_to_save["id"] = existing.id

            final_entries.append(entry_to_save)
        return self.save_bulk(final_entries)

    def save_bulk(self, entries: list[dict] = []):
        """Save all entries or update and recalculate project totals"""
        # Usamos un set para recolectar los IDs de proyectos afectados sin duplicados
        project_ids = set()

        for entry in entries:
            # 1. Extraer el ID del proyecto de la entrada para el recálculo posterior
            p_id = entry.get("project_id")
            if p_id:
                project_ids.add(p_id)

            entry_id = entry.get("id")
            # Quitamos el ID del diccionario para evitar errores en write/create
            entry_data = {k: v for k, v in entry.items() if k != "id"}

            if entry_id:
                self.browse(entry_id).write(entry_data)
            else:
                self.create(entry_data)

        # 2. Recalcular los totales de los proyectos afectados
        if project_ids:
            projects = self.env["pkf.timesheet.project"].browse(list(project_ids))
            # Forzamos el recálculo de los campos computados que dependen de las entradas
            projects._compute_total_hours()
            # Si total_amount_spend depende de total_hour_cost_amount, Odoo lo disparará,
            # pero puedes llamar a los métodos manualmente si no tienen store=True.
            projects._compute_total_spend()

        return True
