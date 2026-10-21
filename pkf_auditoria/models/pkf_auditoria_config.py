import json
from odoo import api, fields, models


class PKFAuditoriaConfig(models.TransientModel):
    _inherit = "res.config.settings"

    sat_url = fields.Char(
        string="URL de los listados SAT",
        config_parameter="pkf_auditoria.sat_url",
        default=(
            "https://www.sat.gob.mx/minisitio/"
            "DatosAbiertos/contribuyentes_publicados.html"
        ),
    )

    notification_groups = fields.Many2many(
        string="Grupos a notificar",
        comodel_name="res.groups",
        relation="pkf_auditoria_notificaciones_groups_rel",
        column1="config_id",
        column2="group_id",
    )

    @api.model
    def get_values(self):
        res = super().get_values()

        raw_ids = (
            self.env["ir.config_parameter"]
            .sudo()
            .get_param(
                "pkf_auditoria.notification_groups",
                default="[]",
            )
        )

        try:
            group_ids = json.loads(raw_ids)
        except (TypeError, ValueError):
            group_ids = []

        res["notification_groups"] = [(6, 0, group_ids)]

        return res

    def set_values(self):
        super().set_values()

        group_ids = self.notification_groups.ids

        self.env["ir.config_parameter"].sudo().set_param(
            "pkf_auditoria.notification_groups",
            json.dumps(group_ids),
        )
