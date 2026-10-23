import logging

from odoo.models import Model
from odoo.api import Environment

from ..models.grupo import Grupo
from ..interfaces.responses import SyncResponseDict
from ..repositories.comercial import ComercialRepository

logger = logging.getLogger(__name__)


class GrupoService:

    def __init__(self, env: Environment):
        self.repo = ComercialRepository(env)
        self.model = env["pkf.partner.group"]

    def _get_groups(self, grupos: list[Grupo]) -> dict[str, Model]:
        codigos = list({g.codigo for g in grupos if g.codigo})

        if not codigos:
            logger.debug("No hay códigos de grupos comerciales para buscar.")
            return {}

        logger.debug(f"Buscando grupos comerciales en Odoo: {len(codigos)} códigos.")

        records = self.model.search(
            [
                ("code", "in", codigos),
            ]
        )

        groups = {rec.code: rec for rec in records if rec.code}

        logger.info(
            f"Grupos comerciales encontrados en Odoo: {len(groups)} de {len(codigos)} códigos."
        )

        return groups

    def _get_values(self, grupo: Grupo) -> dict:
        return {
            "code": grupo.codigo,
            "name": grupo.nombre,
        }

    def sync(self) -> SyncResponseDict:
        logger.info("Iniciando sincronización de grupos comerciales desde CONTPAQi.")

        response = {
            "total": 0,
            "updated": 0,
            "created": 0,
        }

        grupos_comercial = self.repo.getall_groups()

        if not grupos_comercial:
            logger.info(
                "Sincronización finalizada: CONTPAQi no devolvió grupos comerciales."
            )
            return response

        logger.info(
            f"Grupos comerciales recibidos desde CONTPAQi: {len(grupos_comercial)}."
        )

        records = self._get_groups(grupos_comercial)
        skipped = 0

        for grupo in grupos_comercial:
            if not grupo.codigo:
                skipped += 1
                logger.warning(
                    f"Se omite un grupo comercial sin código. Nombre: {grupo.nombre}."
                )
                continue

            values = self._get_values(grupo)
            record = records.get(grupo.codigo)

            try:
                if record:
                    logger.debug(
                        f"Actualizando grupo comercial {grupo.codigo} ({grupo.nombre}), "
                        f"ID de Odoo: {record.id}."
                    )

                    record.write(values)
                    response["updated"] += 1

                else:
                    logger.debug(
                        f"Creando grupo comercial {grupo.codigo} ({grupo.nombre})."
                    )

                    record = self.model.create(values)
                    records[grupo.codigo] = record
                    response["created"] += 1

                    logger.debug(
                        f"Grupo comercial {grupo.codigo} creado correctamente. "
                        f"ID de Odoo: {record.id}."
                    )

                response["total"] += 1

            except Exception:
                logger.exception(
                    f"Error al sincronizar el grupo comercial "
                    f"{grupo.codigo} ({grupo.nombre})."
                )
                raise

        logger.info(
            f"Sincronización de grupos comerciales finalizada. "
            f"Total procesados: {response['total']}; "
            f"actualizados: {response['updated']}; "
            f"creados: {response['created']}; "
            f"omitidos: {skipped}."
        )

        return response
