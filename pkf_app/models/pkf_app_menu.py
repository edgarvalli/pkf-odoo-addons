from odoo import models, fields


class PKFAppMenu(models.Model):
    _name = "pkf.app.menu"
    _description = "Menú de app de PKF"

    name = fields.Char(string="name", required=True)
    url = fields.Char(string="URL")
    icon = fields.Char(string="Icono")
    text = fields.Char(string="Nombre")
    parent_id = fields.Many2one("pkf.app.menu", string="Menú padre")
    sequence = fields.Integer("Secuencia")
    child_ids = fields.One2many(
        "pkf.app.menu", "parent_id", string="Submenús"
    )  # inversa
    group_ids = fields.Many2many(
        "res.groups", "pkf_app_menu_groups_rel", "menu_id", "group_id", string="Grupos"
    )

    icon_display = fields.Html(string="Icon", compute="_render_icon", sanitize=False)

    def _render_icon(self):
        for rec in self:
            if rec.icon:
                rec.icon_display = f'<i class="{rec.icon}"></i>'
            else:
                rec.icon_display = ""


class ResGroupsAppMenu(models.Model):
    _inherit = "res.groups"

    app_menu_id = fields.Many2many(
        "pkf.app.menu",
        "pkf_app_menu_groups_rel",
        "group_id",
        "menu_id",
        string="Menu PKF App",
    )
