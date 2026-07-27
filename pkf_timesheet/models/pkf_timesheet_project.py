from odoo import fields, models, api, _
from ..services import ProjectService
from ..repositories import HrExpenseRepository
from ..domain import DatePeriod


class PKFTimeSheetProject(models.Model):
    _name = "pkf.timesheet.project"
    _description = "PKF - Proyectos"
    _inherit = ["mail.thread", "mail.activity.mixin"]

    # Atributo para que el nombre del registro sea el código y nombre juntos
    _rec_name = "name"

    code = fields.Char(
        "Código", compute="_compute_code", store=True
    )  # store=True para poder buscar por código
    name = fields.Char("Proyecto", required=True, tracking=True)

    partner_group_id = fields.Many2one(
        "pkf.partner.group", string="Grupo de Cliente", required=True, tracking=True
    )

    partner_id = fields.Many2one(
        "res.partner", string="Cliente", required=True, tracking=True
    )

    manager_id = fields.Many2one(
        "hr.employee",
        string="Gerente",
        default=lambda self: self.env.user.employee_id,
        tracking=True,
    )

    director_id = fields.Many2one("hr.employee", string="Director", tracking=True)

    assigned_user_ids = fields.Many2many("hr.employee", string="Equipo Asignado")
    phase_ids = fields.Many2many("pkf.timesheet.project.phase", string="Rubro")
    phase_group_id = fields.Many2one("pkf.timesheet.phase.group", string="Grupo Rubro")

    total_budget_amount = fields.Float("Presupuesto")
    total_expenses_amount = fields.Float(
        "Gastos", compute="_compute_expenses", store=True
    )
    total_timesheet_cost_amount = fields.Float(
        "Total Costo Hora", compute="_compute_total_hours", store=True
    )
    total_amount_spend = fields.Float(
        "Total Gastado", compute="_compute_total_spend", store=True
    )

    state = fields.Selection(
        selection=[
            ("draft", "Borrador"),
            ("in_progress", "En Proceso"),
            ("done", "Finalizado"),
            ("cancelled", "Cancelado"),
        ],
        default="draft",
        tracking=True,
    )

    cancellation_porcentage = fields.Float(
        string="Porcentaje de recargo",  # Cambié el nombre porque sumas +1 en el cálculo
        default=0.0,
        digits=(16, 2),
        help="Indica el porcentaje adicional sobre el costo de hora.",
    )

    note = fields.Text("Notas")

    expense_count = fields.Integer(
        compute="_compute_expense_count", string="Cantidad de Gastos"
    )

    hours_spend_count = fields.Integer(
        compute="_compute_hours_count", string="Cantidad de horas"
    )

    period_open = fields.Boolean("Periodo Abierto", default=False)
    period_type = fields.Selection(
        selection=[
            ("weekly", "Semanal"),
            ("biweekly", "Quincenal"),
            ("monthly", "Mensual"),
        ],
        tracking=True,
        required=True,
        string="Tipo de Periodo",
    )
    period_start_date = fields.Date("Fecha Inicio Periodo")
    period_end_date = fields.Date("Fecha Final Periodo")

    # --- Computes ----

    @api.depends("name")
    def _compute_code(self):
        for rec in self:
            if rec.id:
                rec.code = f"PRO{str(rec.id).zfill(5)}"
            else:
                rec.code = "NUEVO"

    # Nota: Para _compute_expenses, si 'hr.expenses' no tiene el campo 'pfk_timesheet_project_id'
    # definido con el atributo 'store=True', el depend no funcionará bien.
    def _compute_expenses(self):
        for rec in self:
            if not rec.id:
                rec.total_expenses_amount = 0.0
                continue

            expense_repo = HrExpenseRepository(self.env)
            expenses = expense_repo.get_by_project_id(self.id)
            rec.total_expenses_amount = sum(expenses.mapped("total_amount"))

    @api.depends(
        "assigned_user_ids",
        "assigned_user_ids.timesheet_cost",
        "cancellation_porcentage",
    )
    def _compute_total_hours(self):

        project_srv = ProjectService(self.env)
        for rec in self:
            project_srv.calculate_total_timesheet_cost(rec)

    @api.depends(
        "total_budget_amount", "total_timesheet_cost_amount", "total_expenses_amount"
    )
    def _compute_total_spend(self):
        for rec in self:
            # Lógica: Presupuesto - (Costos + Gastos)
            rec.total_amount_spend = rec.total_budget_amount - (
                rec.total_timesheet_cost_amount + rec.total_expenses_amount
            )

    def _compute_expense_count(self):
        for rec in self:
            # Contamos cuántos gastos pertenecen a este proyecto
            rec.expense_count = self.env["hr.expense"].search_count(
                [("pfk_timesheet_project_id", "=", rec.id)]
            )

    def _compute_hours_count(self):
        for rec in self:
            entries = self.env["pkf.timesheet.time.entry"].search(
                [("project_id", "=", rec.id), ("task_id.include_in_cost", "=", True)]
            )
            rec.hours_spend_count = sum(entries.mapped("hours"))

    # --- Onchanges ---

    @api.onchange("period_type")
    def _onchange_period_type(self):
        for rec in self:
            if not rec.period_type:
                rec.period_start_date = False
                rec.period_end_date = False
                continue

            dates = DatePeriod(rec.period_type)
            rec.period_start_date = dates.start_date
            rec.period_end_date = dates.end_date

    @api.onchange("manager_id")
    def _onchange_manager_id(self):
        if not self.manager_id:
            return

        if self.manager_id.parent_id:
            self.director_id = self.manager_id.parent_id

        # Para Many2many en onchange, es mejor asignar directamente el recordset
        # o usar el comando (6, 0, ids)
        subordinates = self.env["hr.employee"].search(
            [("parent_id", "=", self.manager_id.id)]
        )
        if subordinates:
            self.assigned_user_ids = subordinates

    @api.onchange("phase_group_id")
    def _onchange_group_phase_id(self):
        if self.phase_group_id.is_all:
            phases = self.env["pkf.timesheet.project.phase"].search([])
        else:
            phases = self.phase_group_id.phase_ids

        self.phase_ids = [(6, 0, phases.ids)]

    # --- Business Logic ---

    def search_projects_by_user(self, value=None, **kwargs):
        # El employee_id del usuario actual es un recordset, pasamos su ID
        employee = self.env.user.employee_id
        domain = [
            ("assigned_user_ids", "in", employee.ids),
            ("state", "=", "in_progress"),
        ]
        if value:
            domain.append(("name", "ilike", value))  # ilike es case-insensitive
        return self.search_read(domain, ["id", "name"], **kwargs)

    def get_full_data(self, startdate, enddate):
        srv = ProjectService(self.env)
        return srv.get_project_data(self.id, startdate, enddate)

    # --- Actions ---

    def action_view_project_expenses(self):
        return {
            "name": "PKF - Gastos Proyecto",
            "type": "ir.actions.act_window",
            "res_model": "hr.expense",
            "view_mode": "list,form",
            "domain": [("pfk_timesheet_project_id", "=", self.id)],
            "context": {"default_pfk_timesheet_project_id": self.id},
            "target": "current",
        }

    def action_view_hours(self):
        return {
            "name": "PKF - Horas Gastadas",
            "type": "ir.actions.act_window",
            "res_model": "pkf.timesheet.time.entry",
            "view_mode": "list,form",
            "domain": [("project_id", "=", self.id)],
            "context": {"default_project_id": self.id},
            "target": "current",
        }
