import time
import random
import logging
from .types import ContextType
from odoo.api import Environment

_logger = logging.getLogger(__name__)


def enviar_correo(env: Environment, ctx: ContextType, **kwargs):
    template = env.ref("pkf_clientes.estado_cuenta_email_template").sudo()
    email_cc = "facturacion.mty@pkf.com.mx"
    email_values = {
        "email_from": "PKF Monterrey <no-reply@pkfmty.com>",
        "email_to": ctx.get("emails", env.user.email),
        "isbatch": True,
        "state": "cancel",
    }

    if not email_cc == env.user.email:
        email_values["email_cc"] = email_cc

    template.with_context(ctx).send_mail(
        res_id=env.user.partner_id.id,
        force_send=kwargs.get("force_send", False),
        email_values=email_values,
    )


def cronjob_sendmail(env: Environment):
    mails = env["mail.mail"].search(
        [("isbatch", "=", True), ("state", "=", "cancel")], limit=10
    )

    if not mails:
        _logger.info("No hay correos de estado de cuentas por procesar.")

    mails.update({"state": "outgoing"})

    for mail in mails:
        mail.send()
        time.sleep(random.uniform(2, 5))
