from odoo import models, fields, api
from odoo.exceptions import AccessError


class ContribuyenteGroup(models.Model):
    _name = "pkf.contribuyente.group"
    _description = "PKF - Grupo de contribuyentes"
    _rec_name = "name"
    _order = "name"

    name = fields.Char(
        string="Nombre del grupo",
        required=True,
    )

    owner_ids = fields.Many2many(
        string="Propietarios",
        comodel_name="res.users",
        relation="pkf_contribuyente_group_owner_rel",
        column1="group_id",
        column2="user_id",
    )

    member_ids = fields.Many2many(
        comodel_name="res.users",
        relation="pkf_contribuyente_group_member_rel",
        column1="group_id",
        column2="user_id",
        string="Miembros",
    )

    contribuyente_ids = fields.Many2many(
        comodel_name="pkf.contribuyente",
        relation="pkf_contribuyente_group_contribuyente_rel",
        column1="group_id",
        column2="contribuyente_id",
        string="Contribuyentes",
    )

    is_member = fields.Boolean(
        compute="_compute_is_member",
    )

    @api.depends("member_ids")
    def _compute_is_member(self):
        current_user = self.env.user
        for record in self:
            record.is_member = current_user in record.member_ids

    def _check_member_write_access(self):
        for record in self:
            if (
                self.env.user in record.member_ids
                and self.env.user not in record.owner_ids
            ):
                raise AccessError(
                    "Los miembros del grupo solo pueden consultar sus registros."
                )

    def write(self, vals):
        self._check_member_write_access()
        return super().write(vals)

    def unlink(self):
        self._check_member_write_access()
        return super().unlink()
