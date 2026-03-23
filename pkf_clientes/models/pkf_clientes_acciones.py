import base64
from typing import Dict
from pathlib import Path
from odoo.models import AbstractModel
from types import SimpleNamespace
from odoo.modules.module import get_module_path


class PKFClientes(AbstractModel):

    _name = "pkf.clientes.acciones"
    _description = "Acciones para clientes"

    # -------------------------
    # Recursos
    # -------------------------

    def _get_logo_b64(self):
        path = Path(get_module_path("pkf_clientes")) / "static/img/logo.png"

        if not path.exists():
            return None

        with open(path, "rb") as f:
            return "data:image/png;base64," + base64.b64encode(f.read()).decode()

    def _get_banner_b64(self):
        path = Path(get_module_path("pkf_clientes")) / "static/img/banner.png"
        if not path.exists():
            return None

        with open(path, "rb") as f:
            return "data:image/png;base64," + base64.b64encode(f.read()).decode()

    # -------------------------
    # Helpers
    # -------------------------

    def _format_money(self, value):
        return f"{float(value or 0):,.2f}"

    def _format_fecha(self, fecha):
        if not fecha:
            return ""
        return fecha.strftime("%d/%m/%Y")

    def _calcular_totales(self, saldo):
        total = sum(inv.get("total", 0) for inv in saldo)
        pendiente = sum(inv.get("pendiente", 0) for inv in saldo)

        return {
            "saldo_total": self._format_money(total),
            "pendiente_total": self._format_money(pendiente),
        }

    def _formatear_saldo(self, facturas):

        grupos = {
            "vencido": {
                "title": "Vencido",
                "color": "#ae2821",
                "order": 1,
                "facturas": [],
            },
            "vencido_90": {
                "title": "Vencido a 90 días",
                "color": "#d24e12",
                "order": 2,
                "facturas": [],
            },
            "vencido_60": {
                "title": "Vencido a 60 días",
                "color": "#e1ab16",
                "order": 3,
                "facturas": [],
            },
            "vigente": {
                "title": "Vigente",
                "color": "#388e27",
                "order": 4,
                "facturas": [],
            },
        }

        for inv in facturas:
            if "estatus" in inv and inv["estatus"] in grupos:
                grupos[inv["estatus"]]["facturas"].append(
                    {
                        **inv,
                        "fecha": self._format_fecha(inv.get("fecha")),
                        "total": self._format_money(inv.get("total")),
                        "pendiente": self._format_money(inv.get("pendiente")),
                    }
                )

        return sorted(grupos.values(), key=lambda x: x["order"])

    def _fechas(self):
        from datetime import datetime
        import pytz

        timezone = pytz.timezone("America/Monterrey")
        today = datetime.now(tz=timezone)
        return {
            "fecha": today.strftime("%d de %B de %Y"),
            "titulo_header": f"Estado de Cuenta %B {today.year}",
        }

    # -------------------------
    # Contexto de template
    # -------------------------

    def _build_context(self, cliente):

        facturas = cliente.pop("facturas", [])
        fechas = self._fechas()

        return {
            **cliente,
            **fechas,
            "facturas": self._formatear_saldo(facturas),
            "metadata": self._calcular_totales(facturas),
            "logo": self._get_logo_b64(),
            "banner": self._get_banner_b64(),
        }

    # -------------------------
    # Servicio principal
    # -------------------------

    def enviar_correo(self, data: Dict, **kwargs):
        ctx = self._build_context(data)
        template = self.env.ref("pkf_clientes.estado_cuenta_email_template").sudo()
        template.with_context(ctx).send_mail(
            res_id=self.env.user.partner_id.id,
            force_send=kwargs.get("force_send", False),
            email_values={
                "email_from": "PKF Monterrey <no-reply@pkfmty.com>",
                "email_to": kwargs.get("email_to", self.env.user.email),
                # "email_cc": "facturacion.mty@pkf.com.mx",
            },
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
