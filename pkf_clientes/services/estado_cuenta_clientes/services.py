from odoo import models
import pytz, logging, uuid
from datetime import datetime
from collections import defaultdict
from odoo.exceptions import UserError
from .repository import get_estado_cuenta
from ...utils.tools import format_money, format_fecha
from .types import GroupKeysDict, GroupDict, ContextType, FacturaRow

_logger = logging.getLogger(__name__)


class EstadoCuentaService(models.AbstractModel):
    _name = "pkf.estado.cuenta.service"

    uid: str = str(uuid.uuid4())

    def _get_data_sql(self):
        dbname = self.env.company.ev_contpaqi_comercial_db.dbname

        if not dbname:
            raise UserError(
                "Debe de definir la base de datos de Contpaqi en la empresa."
            )

        with self.env["ev.tools.mssql"].connect(dbname) as db:
            return get_estado_cuenta(db)

    def _set_log(self, **kwargs):
        self = self.sudo()
        self.env["pkf.envios.logs"].create(
            {
                "uuid": self.uid,
                "fecha": datetime.now(),
                "cliente": kwargs.get("cliente", "System"),
                "rfc": kwargs.get("rfc", "XAXX01010100"),
                "estatus": kwargs.get("estatus", "ok"),
                "evento": kwargs.get("evento", ""),
            }
        )

    def _get_groups(self) -> GroupKeysDict:
        return {
            "vencido": {
                "title": "Vencido a más de 60 días",
                "color": "#0f3780",
                "order": 1,
                "facturas": [],
                "total": 0,
                "saldopendiente": 0,
            },
            "vencido60": {
                "title": "Vencido a 30 días",
                "color": "#0f3780",
                "order": 2,
                "facturas": [],
                "total": 0,
                "saldopendiente": 0,
            },
            "vigente": {
                "title": "Al corriente",
                "color": "#0f3780",
                "order": 3,
                "facturas": [],
                "total": 0,
                "saldopendiente": 0,
            },
        }

    def _fecha(self):
        """Entrega las fechas para el template"""
        timezone = pytz.timezone("America/Monterrey")
        today = datetime.now(tz=timezone)
        return today.strftime("%d de %B de %Y")

    def _build_context(self, cliente: ContextType, row: FacturaRow):
        if "facturas_group" not in cliente:
            cliente["facturas_group"] = self._get_groups()
            cliente["facturas"] = []

            cliente["emails"] = row.get("emails")
            cliente["razonsocial"] = row.get("razonsocial")
            cliente["rfc"] = row.get("rfc")
            cliente["fecha"] = self._fecha()
            cliente["saldototal"] = 0

        cliente["saldototal"] += row["pendiente"]
        # grupo
        group_key = row["estatus"]
        group: GroupDict = cliente["facturas_group"].get(group_key)

        if group:
            group["facturas"].append(row)
            group["total"] += row["total"]
            group["saldopendiente"] += row["pendiente"]

    def _process_context(self, ctx: dict[int, ContextType]):
        for cliente in ctx.values():
            cliente["facturas"] = list(cliente["facturas_group"].values())
            for group in cliente["facturas"]:
                group["saldototal"] = format_money(group["saldototal"])
                for inv in group["facturas"]:
                    inv["total"] = format_money(inv["total"])
                    inv["pendiente"] = format_money(inv["pendiente"])
                    inv["fecha"] = format_fecha(inv["fecha"])

    def _format_context(self, ctx: ContextType):

        ctx["saldototal"] = format_money(ctx["saldototal"])
        facturas: list[GroupDict] = list(ctx.get("facturas_group").values())
        if facturas:
            for fact in facturas:
                fact["total"] = format_money(fact["total"])
                fact["saldopendiente"] = format_money(fact["saldopendiente"])
                fact["facturas"] = [
                    {
                        **_ft,
                        "fecha": format_fecha(_ft["fecha"]),
                        "total": format_money(_ft["total"]),
                        "pendiente": format_money(_ft["pendiente"]),
                    }
                    for _ft in fact["facturas"]
                ]
        ctx["facturas"] = facturas

    def enviar_correo(self, ctx: ContextType, **kwargs):
        template = self.env.ref("pkf_clientes.estado_cuenta_email_template").sudo()
        email_cc = "facturacion.mty@pkf.com.mx"
        email_values = {
            "email_from": "PKF Monterrey <no-reply@pkfmty.com>",
            "email_to": ctx.get("emails", self.env.user.email),
        }

        if not email_cc == self.env.user.email:
            email_values["email_cc"] = email_cc

        template.with_context(ctx).send_mail(
            res_id=self.env.user.partner_id.id,
            force_send=kwargs.get("force_send", False),
            email_values=email_values,
        )

    def enviar_estado_de_cuenta_bulk(self, **kwargs) -> dict[int, ContextType]:
        _logger.info("Iniciando proceso....")
        start_process = datetime.now()

        try:
            rows = self._get_data_sql()

            context: dict[int, ContextType] = defaultdict(dict)

            for row in rows:
                key = row["idcliente"]
                cliente = context[key]
                self._build_context(cliente, row)

            for ctx in context.values():

                self._format_context(ctx)

                razonsocial = ctx.get("razonsocial")
                rfc = ctx.get("rfc")

                try:
                    emails = ctx.get("emails")

                    if not emails:
                        self._set_log(
                            cliente=razonsocial,
                            rfc=rfc,
                            evento="No tiene correos configurados para envio.",
                        )

                    else:
                        _logger.info(
                            f"Enviando estado de cuenta a cliente {razonsocial}"
                        )
                        self.enviar_correo(ctx, **kwargs)
                        _logger.info(f"Correo programado para el cliente {razonsocial}")

                        self._set_log(
                            cliente=razonsocial,
                            rfc=rfc,
                            evento=f"Correo enviado a los correos {emails}",
                        )
                except Exception as e:
                    self._set_log(
                        cliente=razonsocial,
                        rfc=rfc,
                        estatus="error",
                        evento=str(e),
                    )

        except Exception as e:
            _logger.error(f"Ocurrio un error {e}")

        finally:
            self.env["pkf.envios.logs"].send_bitacora(
                uid=self.uid, start=start_process, end=datetime.now()
            )
