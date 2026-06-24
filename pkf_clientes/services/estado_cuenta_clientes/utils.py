import pytz
from datetime import datetime


def fecha_mx():
    """Entrega las fechas para el template"""
    timezone = pytz.timezone("America/Monterrey")
    today = datetime.now(tz=timezone)
    return today.strftime("%d de %B de %Y")
