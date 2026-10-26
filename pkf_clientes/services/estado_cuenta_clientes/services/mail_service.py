import time
import random
import logging
from odoo.api import Environment

from ..models.context import Context

_logger = logging.getLogger(__name__)


class MailService:

    def __init__(self, env: Environment):
        self.env = env

    def enviar_correo(self, ctx: Context, **kwargs):
        template = self.env.ref("pkf_clientes.estado_cuenta_email_template")
        email_cc = "facturacion.mty@pkf.com.mx,faraujo@pkf.com.mx"
        email_values = {
            "email_from": "PKF Monterrey <no-reply@pkfmty.com>",
            "email_to": ctx.emails or self.env.user.email,
            "isbatch": True,
            "state": "cancel",
        }

        if ctx.mail_server_id:
            email_values["mail_server_id"] = ctx.mail_server_id

        if not email_cc == self.env.user.email:
            email_values["email_cc"] = email_cc

        ctx_dict = ctx.to_dict()
        ctx_dict["facturas"] = [f.to_dict() for f in ctx.facturas]

        template.with_context(ctx_dict).send_mail(
            res_id=self.env.user.partner_id.id,
            force_send=kwargs.get("force_send", False),
            email_values=email_values,
        )

    def cronjob_sendmail(self):
        mails = self.env["mail.mail"].search(
            [("isbatch", "=", True), ("state", "=", "cancel")], limit=10
        )

        if not mails:
            _logger.info("No hay correos de estado de cuentas por procesar.")

        mails.update({"state": "outgoing"})

        for mail in mails:
            _logger.info(f"Enviando correo a {mail.email_to}")
            mail.send()
            time.sleep(random.uniform(2, 5))
