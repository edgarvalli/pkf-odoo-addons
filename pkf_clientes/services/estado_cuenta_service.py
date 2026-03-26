import pytz, uuid
from typing import List, Dict
from datetime import datetime
from dataclasses import dataclass, field
from odoo.exceptions import UserError
from odoo.orm.environments import Environment
from ..utils.tools import format_money, format_fecha, get_img_b64
from ..types.estado_cuenta_types import (
    GroupKeysDict,
    GroupDict,
    MetadataDict,
    TotalesDict,
    ContextType,
)


@dataclass
class EstadoCuentaService:
    env: Environment
    uid: str = field(default_factory=lambda: str(uuid.uuid4()))

    def _get_groups(self) -> GroupKeysDict:
        return {
            "vencido": {
                "title": "Vencido",
                "color": "#0f3780",
                "order": 1,
                "facturas": [],
                "total": 0,
                "total_pendiente": 0,
            },
            "vencido_90": {
                "title": "Vencido a 90 días",
                "color": "#0f3780",
                "order": 2,
                "facturas": [],
                "total": 0,
                "total_pendiente": 0,
            },
            "vencido_60": {
                "title": "Vencido a 60 días",
                "color": "#0f3780",
                "order": 3,
                "facturas": [],
                "total": 0,
                "total_pendiente": 0,
            },
            "vigente": {
                "title": "Vigente",
                "color": "#0f3780",
                "order": 4,
                "facturas": [],
                "total": 0,
                "total_pendiente": 0,
            },
        }

    def _fecha_metadata(self) -> MetadataDict:
        """Entrega las fechas para el template"""
        timezone = pytz.timezone("America/Monterrey")
        today = datetime.now(tz=timezone)
        return {
            "fecha": today.strftime("%d de %B de %Y"),
            "titulo_header": f"Estado de Cuenta %B {today.year}",
        }

    def _calcular_totales(self, saldo: List[Dict]) -> TotalesDict:
        """Calcula cuanto esta pendiente y el saldo total"""
        total = sum(inv.get("total", 0) for inv in saldo)
        pendiente = sum(inv.get("pendiente", 0) for inv in saldo)

        return {
            "saldo_total": format_money(total),
            "pendiente_total": format_money(pendiente),
        }

    def _map_groups(self, groups: GroupKeysDict) -> List[GroupDict]:
        groups = sorted(groups.values(), key=lambda x: x["order"])
        groups = [
            {
                **g,
                "total": format_money(g["total"]),
                "total_pendiente": format_money(g["total_pendiente"]),
            }
            for g in groups
        ]

        return groups

    def _formatear_saldo(self, facturas: List[Dict]):
        """Se formatea el saldo a 90,60 dias vencidos y las vigentes"""
        groups = self._get_groups()
        for inv in facturas:

            key = inv.get("estatus")
            group = groups.get(key)

            if not group:
                continue

            total = float(inv.get("total") or 0)
            total_pendiente = float(inv.get("pendiente") or 0)

            group["facturas"].append(
                {
                    **inv,
                    "fecha": format_fecha(inv.get("fecha")),
                    "total": format_money(total),
                    "pendiente": format_money(total_pendiente),
                }
            )
            group["total"] += total
            group["total_pendiente"] += total_pendiente

        return self._map_groups(groups)

    def _get_data_client(self, idclient: int):
        comercial = self.env["ev.contpaqi.comercial"]
        cliente = comercial.saldo_cliente_detalle(id=idclient)
        if not cliente:
            raise UserError(f"Cliente no encontrado con id {idclient}")

        return cliente

    def _build_context(self, cliente: Dict) -> ContextType:
        facturas = cliente.pop("facturas", [])
        fechas = self._fecha_metadata()

        return {
            **cliente,
            **fechas,
            "facturas": self._formatear_saldo(facturas),
            "metadata": self._calcular_totales(facturas),
            "logo": get_img_b64("logo.png"),
            "banner": get_img_b64("banner.png"),
        }

    def enviar_correo(self, data: Dict, **kwargs):
        ctx = self._build_context(data)
        template = self.env.ref("pkf_clientes.estado_cuenta_email_template").sudo()
        email_cc = "facturacion.mty@pkf.com.mx"
        email_values = {
            "email_from": "PKF Monterrey <no-reply@pkfmty.com>",
            "email_to": kwargs.get("email_to", self.env.user.email),
        }

        if not email_cc == self.env.user.email:
            email_values["email_cc"] = email_cc

        template.with_context(ctx).send_mail(
            res_id=self.env.user.partner_id.id,
            force_send=kwargs.get("force_send", False),
            email_values=email_values,
        )

    def enviar_estado_cuenta_cliente(self, idcliente: int):
        if not idcliente:
            raise UserError("Debe de definir una id de cliente.")
        try:
            data = self._get_data_client(idcliente)
            if not data:
                raise UserError(f"No se encontro el cliente con id {idcliente}")
            self.enviar_correo(data, force_send=True)
            return True
        except Exception as e:
            raise UserError(str(e))
