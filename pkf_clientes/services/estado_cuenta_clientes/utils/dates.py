import pytz
from datetime import datetime

from ..constants.dates import MESES_MX


def fecha_mx(date: datetime | None = None) -> str:
    """Entrega la fecha en formato español para el template."""
    timezone = pytz.timezone("America/Monterrey")
    today = date or datetime.now(tz=timezone)

    return f"{today.day:02d} de " f"{MESES_MX[today.month - 1]} de " f"{today.year}"
