import pytz
from datetime import datetime


from ..constants.dates import MESES_MX, TZ_MONTERREY


def fecha_mx(today: datetime) -> str:
    return f"{today.day:02d} de " f"{MESES_MX[today.month - 1]} de " f"{today.year}"
