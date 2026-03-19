def numero_a_letras(numero: float) -> str:
    unidades = (
        "",
        "uno",
        "dos",
        "tres",
        "cuatro",
        "cinco",
        "seis",
        "siete",
        "ocho",
        "nueve",
        "diez",
        "once",
        "doce",
        "trece",
        "catorce",
        "quince",
        "dieciséis",
        "diecisiete",
        "dieciocho",
        "diecinueve",
        "veinte",
    )

    decenas = (
        "",
        "",
        "veinte",
        "treinta",
        "cuarenta",
        "cincuenta",
        "sesenta",
        "setenta",
        "ochenta",
        "noventa",
    )

    centenas = (
        "",
        "ciento",
        "doscientos",
        "trescientos",
        "cuatrocientos",
        "quinientos",
        "seiscientos",
        "setecientos",
        "ochocientos",
        "novecientos",
    )

    def convertir_menor_1000(n):
        if n == 0:
            return ""
        elif n == 100:
            return "cien"
        c = n // 100
        d = (n % 100) // 10
        u = n % 10
        if n <= 20:
            return unidades[n]
        elif n < 100:
            if u == 0:
                return decenas[d]
            else:
                return f"{decenas[d]} y {unidades[u]}"
        else:
            resto = n % 100
            return f"{centenas[c]} {convertir_menor_1000(resto)}".strip()

    def convertir_entero(n):
        if n == 0:
            return "cero"

        partes = []
        millones = n // 1_000_000
        miles = (n % 1_000_000) // 1_000
        resto = n % 1_000

        if millones:
            if millones == 1:
                partes.append("un millón")
            else:
                partes.append(f"{convertir_entero(millones)} millones")

        if miles:
            if miles == 1:
                partes.append("mil")
            else:
                partes.append(f"{convertir_menor_1000(miles)} mil")

        if resto:
            partes.append(convertir_menor_1000(resto))

        return " ".join(partes).strip()

    entero = int(numero)
    decimales = round((numero - entero) * 100)

    letras = convertir_entero(entero)

    if decimales > 0:
        letras += f" con {convertir_entero(decimales)}"

    return letras
