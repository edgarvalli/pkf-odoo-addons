from datetime import datetime, timedelta


def next_5_min():
    now = datetime.now()

    # minutos que faltan para el siguiente múltiplo de 5
    minutes_to_add = 5 - (now.minute % 5)

    # si ya estás justo en múltiplo de 5, saltas al siguiente
    if minutes_to_add == 0:
        minutes_to_add = 5

    future = now + timedelta(minutes=minutes_to_add)

    # opcional: limpiar segundos
    future = future.replace(second=0, microsecond=0)

    return future
