from odoo import api
from odoo.orm.registry import Registry


def build_env(dbname: str, uid: int, ctx: dict, su=False):
    registry = Registry(dbname)

    cr = registry.cursor()
    return api.Environment(cr, uid, ctx, su)
