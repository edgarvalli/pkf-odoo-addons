import pytz
from datetime import datetime


def format_money(value):
    return f"{float(value or 0):,.2f}"


def fecha_mx():
    """Entrega las fechas para el template"""
    timezone = pytz.timezone("America/Monterrey")
    today = datetime.now(tz=timezone)
    return today.strftime("%d de %B de %Y")
