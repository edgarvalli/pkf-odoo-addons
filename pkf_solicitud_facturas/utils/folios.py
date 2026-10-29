from odoo import _
from odoo.api import Environment


def get_next_folio(env: Environment, model: str):
    sequence = env["ir.sequence"]
    return sequence.next_by_code(model) or _("Nuevo")
