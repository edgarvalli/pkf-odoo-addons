import logging
from zoneinfo import ZoneInfo
from odoo.api import Environment
from datetime import datetime, time, timedelta

logger = logging.getLogger(__name__)


def configure_ir_cron_sync_clientes_grupos_comercial(env: Environment):

    cron = env.ref(
        "pkf_clientes.cron_sync_clientes_y_grupos_comercial",
        raise_if_not_found=False,
    )
    if not cron:
        logger.info("Cron Id no encontrado....")
        return

    if cron.active:
        logger.info("El cron ya esta activo configurado.....")
        return

    tz = ZoneInfo("America/Monterrey")
    today = datetime.now()
    nextcall = datetime.combine(today.date(), time(3, 0), tzinfo=tz)

    if today >= nextcall:
        nextcall += timedelta(days=1)

    nextcall_utc = nextcall.astimezone(ZoneInfo("UTC")).replace(tzinfo=None)

    cron.update(({"nextcall": nextcall_utc, "active": True}))

    logger.info(
        "Cron '%s' activado. Próxima ejecución: %s",
        cron.name,
        nextcall.strftime("%Y-%m-%d %H:%M:%S %Z"),
    )
