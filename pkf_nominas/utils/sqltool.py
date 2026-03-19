def make_conditions(params: dict, prefix: str = None) -> str:

    conditions = []

    for k, v in params.items():
        v = str(v)
        k = f"{prefix}.{k}" if prefix else k
        if "*" in v:
            v = str(v).replace("*", "%")
            conditions.append(f"{k} LIKE '{v}'")
        else:
            try:
                v = int(v)
                conditions.append(f"{k}={v}")
            except:
                conditions.append(f"{k}='{v}'")
    conds = " OR ".join(conditions)
    return conds if len(conditions) > 0 else None


def empleado_query(dbname: str, kvargs: dict):
    query = f"""
        SELECT
            empleado.idempleado id, empleado.codigoempleado codigo,
            CONCAT(empleado.nombre,' ',empleado.apellidopaterno,' ' ,empleado.apellidomaterno) AS nombre,
            CONCAT(empleado.rfc, FORMAT(empleado.fechanacimiento, 'yyMMdd') ,empleado.homoclave) as rfc,
            CONCAT(empleado.curpi, FORMAT(empleado.fechanacimiento, 'yyMMdd') ,empleado.curpf) as curp,
            empleado.fechaalta, empleado.numerosegurosocial, empleado.codigopostal,
            CASE
                WHEN empleado.basecotizacionimss = 'F' THEN 'Fijo'
                WHEN empleado.basecotizacionimss = 'V' THEN 'Variable'
                WHEN empleado.basecotizacionimss = 'M' THEN 'Mixto'
            END AS tiposalario,
            CASE
                WHEN turno.TipoJornada = 1 THEN '01 Diurna'
                WHEN turno.TipoJornada = 2 THEN '02 Nocturna'
                WHEN turno.TipoJornada = 3 THEN '03 Mixta'
                WHEN turno.TipoJornada = 4 THEN '04 Por Hora'
            END AS jornada,
            puesto.descripcion puesto, departamentos.descripcion departamento,empleado.CorreoElectronico correo,
            empleado.sueldointegrado sbc, empleado.cidregistropatronal,empresa.GUIDDSL guiddsl,
            empresa.NombreEmpresaFiscal empresa
        FROM {dbname}.dbo.nom10001 empleado
        INNER JOIN {dbname}.dbo.NOM10006 puesto ON puesto.idpuesto = empleado.idpuesto
        INNER JOIN {dbname}.dbo.NOM10032 turno ON empleado.idturno = turno.idturno
        INNER JOIN {dbname}.dbo.NOM10003 departamentos ON departamentos.iddepartamento = empleado.iddepartamento
        LEFT JOIN {dbname}.dbo.NOM10000 empresa ON empresa.GUIDEmpresa <> ''
    """

    rfc = kvargs.get("rfc")

    if rfc:
        query += f"""
            WHERE
            UPPER(CONCAT(empleado.rfc, FORMAT(empleado.fechanacimiento, 'yyMMdd') ,empleado.homoclave))
            = UPPER('{rfc}')
        """

        return query

    email = kvargs.get("email")
    if email:
        query += f"\n WHERE empleado.CorreoElectronico = '{email}'"
        return query

    empleadoid = kvargs.get("empleadoid")
    if empleadoid:
        query += f"WHERE empleado.idempleado = {empleadoid}"
        return query

    codigoempleado = kvargs.get("codigoempleado")
    if codigoempleado:
        query += f"WHERE empleado.codigoempleado = {codigoempleado}"
        return query

    return query
