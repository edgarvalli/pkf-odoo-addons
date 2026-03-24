from typing import Dict
from odoo.models import AbstractModel
from types import SimpleNamespace
from ..utils.estado_de_cuenta_tools import build_context


class PKFClientes(AbstractModel):

    _name = "pkf.clientes.acciones"
    _description = "Acciones para clientes"

    # -------------------------
    # Servicio principal
    # -------------------------

    def enviar_correo(self, data: Dict, **kwargs):
        ctx = build_context(data)
        template = self.env.ref("pkf_clientes.estado_cuenta_email_template").sudo()
        email_cc = "facturacion.mty@pkf.com.mx"
        email_values = {
            "email_from": "PKF Monterrey <no-reply@pkfmty.com>",
            "email_to": kwargs.get("email_to", self.env.user.email),
        }

        # if not email_cc == self.env.user.email:
        #     email_values["email_cc"] = email_cc

        template.with_context(ctx).send_mail(
            res_id=self.env.user.partner_id.id,
            force_send=kwargs.get("force_send", False),
            email_values=email_values,
        )

    def enviar_estado_de_cuenta(self, idcliente: int):
        try:
            self = self.sudo()
            comercial = self.env["ev.contpaqi.comercial"]
            cliente = comercial.saldo_cliente_detalle(id=idcliente)

            if not cliente:
                return SimpleNamespace(error=True, message="No se encontro el cliente.")
            self.enviar_correo(cliente, force_send=True)

            return SimpleNamespace(error=False, message="ok")
        except Exception as e:
            return SimpleNamespace(error=True, message=str(e))

    def enviar_facturas_zip(self):

        return
