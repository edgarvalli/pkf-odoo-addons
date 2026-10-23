import logging

from odoo.models import Model
from odoo.api import Environment

from ..models.cliente import Cliente
from ..interfaces.responses import SyncResponseDict
from ..repositories.comercial import ComercialRepository

logger = logging.getLogger(__name__)


class ClienteService:

    def __init__(self, env: Environment):
        self.repo = ComercialRepository(env)
        self.model = env["res.partner"]
        self.group_model = env["pkf.partner.group"]

    def _get_partners(self, clientes: list[Cliente]) -> dict[str, Model]:
        codigos = list({c.codigo for c in clientes if c.codigo})

        if not codigos:
            logger.debug("No hay códigos de clientes para buscar en Odoo.")
            return {}

        logger.debug(f"Buscando contactos en Odoo. Códigos recibidos: {len(codigos)}")

        records = self.model.search(
            [
                ("pkf_partner_code", "in", codigos),
            ]
        )

        partners = {
            rec.pkf_partner_code: rec for rec in records if rec.pkf_partner_code
        }

        logger.info(
            f"Contactos encontrados en Odoo: {len(partners)} de {len(codigos)} códigos."
        )

        return partners

    def _get_groups_ids(self, clientes: list[Cliente]) -> dict[str, int]:
        codigos = list(
            {
                c.grupo.codigo
                for c in clientes
                if c.grupo and c.grupo.id != 0 and c.grupo.codigo
            }
        )

        if not codigos:
            logger.debug("No hay grupos comerciales para buscar en Odoo.")
            return {}

        groups = self.group_model.search([("code", "in", codigos)])

        group_ids = {group.code: group.id for group in groups}

        missing = set(codigos) - set(group_ids)

        logger.info(
            f"Grupos comerciales encontrados: {len(group_ids)} de {len(codigos)} códigos."
        )

        if missing:
            logger.warning(
                f"No se encontraron {len(missing)} grupos comerciales en Odoo. Códigos: {sorted(missing)}"
            )

        return group_ids

    def _get_values(self, cliente: Cliente, groups: dict[str, int]) -> dict:
        values = {"name": cliente.razon_social, "pkf_partner_code": cliente.codigo}

        if cliente.rfc:
            values["vat"] = cliente.rfc

        if cliente.email:
            values["email"] = cliente.email

        if cliente.grupo and cliente.grupo.id != 0:
            group_id = groups.get(cliente.grupo.codigo)

            if group_id:
                values["pkf_partner_group"] = group_id
            else:
                logger.debug(
                    f"El cliente {cliente.codigo} ({cliente.razon_social}) ",
                    f"tiene el grupo {cliente.grupo.codigo}, ",
                    "que no se encontró en Odoo.",
                )

        return values

    def _update(self, cliente: Cliente, record: Model, groups: dict[str, int]) -> None:
        values = self._get_values(cliente, groups)

        logger.debug(
            f"Actualizando cliente {cliente.codigo} (partner ID: {record.id})."
        )

        record.write(values)

    def _create(self, cliente: Cliente, groups: dict[str, int]) -> None:
        values = self._get_values(cliente, groups)

        logger.debug(f"Creando cliente {cliente.codigo} ({cliente.razon_social}).")

        record = self.model.create(values)

        logger.debug(
            f"Cliente {cliente.codigo} creado correctamente. Partner ID: {record.id}."
        )

    def sync(self) -> SyncResponseDict:
        logger.info("Iniciando sincronización de clientes desde CONTPAQi.")

        clientes = self.repo.getall_clientes()

        response = {
            "total": 0,
            "updated": 0,
            "created": 0,
        }

        if not clientes:
            logger.info("Sincronización finalizada: CONTPAQi no devolvió clientes.")
            return response

        logger.info(f"Clientes recibidos desde CONTPAQi: {len(clientes)}.")

        partners = self._get_partners(clientes)
        groups = self._get_groups_ids(clientes)

        skipped = 0

        for cliente in clientes:
            if not cliente.codigo:
                skipped += 1
                logger.warning(
                    f"Se omite un cliente sin código. Razón social: {cliente.razon_social}."
                )
                continue

            record = partners.get(cliente.codigo)

            try:
                if record:
                    self._update(cliente, record, groups)
                    response["updated"] += 1
                else:
                    self._create(cliente, groups)
                    response["created"] += 1

                response["total"] += 1

            except Exception:
                logger.exception(
                    "Error al sincronizar el cliente %s (%s).",
                    cliente.codigo,
                    cliente.razon_social,
                )
                raise

        logger.info(
            "Sincronización finalizada. Total procesados: %s; "
            "actualizados: %s; creados: %s; omitidos: %s.",
            response["total"],
            response["updated"],
            response["created"],
            skipped,
        )

        return response
