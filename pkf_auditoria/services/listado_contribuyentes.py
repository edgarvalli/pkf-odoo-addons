import re
import io
import csv
import json
import requests

from typing import Literal
from odoo.models import Model
from odoo.exceptions import UserError
from odoo.api import Environment

from ..utils.logger import logger
from ..models_dict.contribuyente_dict import ContribuyenteDict


from typing import Literal
from urllib.parse import urljoin


class ListadoContribuyentes:

    def __init__(
        self,
        env: Environment,
        tipo: Literal["69-B", "69_B_Bis"] = "69-B",
    ):

        self.params = env["ir.config_parameter"].sudo()
        self.env = env
        self.tipo = tipo
        self.url = self.params.get_param(
            "pkf_auditoria.sat_url",
            "https://www.sat.gob.mx/minisitio/DatosAbiertos/contribuyentes_publicados.html",
        )
        self.session = requests.Session()
        self.session.headers.update({"User-Agent": "Mozilla/5.0"})

    def _start_download(self) -> str:
        logger.info("Consultando página del SAT: %s", self.url)

        response = self.session.get(self.url, timeout=30)
        response.raise_for_status()

        pattern = (
            r'<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>' r"\s*Listado completo\s*</a>"
        )
        matches = re.findall(
            pattern,
            response.text,
            re.IGNORECASE,
        )

        # Seleccionar según el tipo de listado solicitado.
        csv_url = next(
            (match for match in matches if self.tipo.casefold() in match.casefold()),
            None,
        )

        if not csv_url:
            raise ValueError(f"No se encontró el enlace del listado {self.tipo}.")

        csv_url = urljoin(self.url, csv_url)

        logger.info("CSV seleccionado: %s", csv_url)
        return csv_url

    def _read_csv(self, url: str) -> list["ContribuyenteDict"]:
        logger.info("Descargando CSV: %s", url)

        response = self.session.get(url, timeout=120)
        response.raise_for_status()

        content = response.content.decode("cp1252")

        if not content.strip():
            raise ValueError("El CSV está vacío.")

        reader = csv.reader(io.StringIO(content))
        headers = None

        for row in reader:
            if len(row) < 2:
                continue

            normalized = [cell.strip().casefold().rstrip(".") for cell in row[:2]]

            if normalized == ["no", "rfc"]:
                headers = row
                break

        if headers is None:
            raise ValueError("No se encontró el encabezado que comienza con No, RFC.")

        contribuyentes = []

        for row in reader:
            if not row or not any(cell.strip() for cell in row):
                continue

            # Ignorar filas de datos que no tengan RFC.
            if len(row) < 2 or not row[1].strip():
                continue

            contribuyentes.append(self._build_contribuyente(row))

        logger.info(
            "Se leyeron %d contribuyentes del CSV.",
            len(contribuyentes),
        )

        return contribuyentes

    def _build_contribuyente(self, row: list[str]) -> "ContribuyenteDict":
        row = [cell.strip() for cell in row]
        row += [""] * max(0, 20 - len(row))

        return {
            "rfc": row[1].upper(),
            "nombre": row[2],
            "situacion": str(row[3]).strip().lower().replace(" ", "_"),
            "oficio_presunto_sat": row[4],
            "publicacion_presunto_sat": row[5],
            "oficio_presunto_dof": row[6],
            "publicacion_presunto_dof": row[7],
            "oficio_desvirtuado_sat": row[8],
            "publicacion_desvirtuado_sat": row[9],
            "oficio_desvirtuado_dof": row[10],
            "publicacion_desvirtuado_dof": row[11],
            "oficio_definitivo_sat": row[12],
            "publicacion_definitivo_sat": row[13],
            "oficio_definitivo_dof": row[14],
            "publicacion_definitivo_dof": row[15],
            "oficio_sentencia_favorable_sat": row[16],
            "publicacion_sentencia_favorable_sat": row[17],
            "oficio_sentencia_favorable_dof": row[18],
            "publicacion_sentencia_favorable_dof": row[19],
        }

    def _build_users_by_group(self) -> list[str]:
        raw_ids = self.params.get_param(
            "pkf_auditoria.notification_groups",
            default="[]",
        )

        try:
            group_ids = json.loads(raw_ids)
        except (TypeError, ValueError):
            logger.warning("La configuración de grupos de notificación no es válida.")
            return []

        if not isinstance(group_ids, list) or not group_ids:
            logger.info("No hay grupos configurados para las notificaciones.")
            return []

        groups = self.env["res.groups"].browse(group_ids).exists()

        if not groups:
            logger.info("No se encontraron los grupos configurados.")
            return []

        users = self.env["res.users"]

        for group in groups:
            users |= group.user_ids

        users = users.filtered(lambda user: user.active and user.email)

        emails = list(dict.fromkeys(users.mapped("email")))

        if not emails:
            logger.warning(
                "Los grupos configurados no tienen usuarios activos con correo."
            )

        return emails

    def _schedule_notification(self, values: dict):
        template = self.env.ref(
            "pkf_auditoria.mail_template_contribuyentes_sincronizacion",
            raise_if_not_found=False,
        )

        if not template:
            raise UserError("Template no encontrado")

        emails = self._build_users_by_group()

        if not emails:
            logger.warning("No hay destinatarios para la notificación SAT.")
            return False

        template.with_context(**values).send_mail(
            res_id=self.env.user.id,
            force_send=False,
            email_values={
                "email_from": "PKF Monterrey <no-reply@pkfmty.com>",
                "email_to": ",".join(emails),
            },
        )

        return True

    def _update_record(
        self, records: Model, values: dict[str, "ContribuyenteDict"]
    ) -> int:
        updated = 0

        for record in records:
            rfc = record.rfc.strip().upper()

            value: ContribuyenteDict = values.pop(rfc, None)

            if value is None:
                continue

            if value.get("situacion", "") == record.situacion:
                continue

            record.write(value)
            updated += 1

        return updated

    def _save_into_odoo(self, values: list["ContribuyenteDict"]) -> dict[str, int]:
        model = self.env["pkf.contribuyente"]

        if not values:
            return {"created": 0, "updated": 0}

        values_dict = {}

        for value in values:
            rfc = value.get("rfc", "").strip().upper()

            if not rfc:
                continue

            if rfc in values_dict:
                logger.warning(f"RFC duplicado en la importación: {rfc}")

            values_dict[rfc] = {**value, "rfc": rfc}

        if not values_dict:
            return {"created": 0, "updated": 0}

        existing_records = model.search([("rfc", "in", list(values_dict))])

        updated = self._update_record(existing_records, values_dict)

        created = len(values_dict)

        if values_dict:
            model.create(list(values_dict.values()))

        result = {
            "created": created,
            "updated": updated,
        }

        logger.info(
            f"Sincronización SAT finalizada: {created} creados, {updated} actualizados."
        )

        return result

    def sync(self) -> dict[str, int]:
        csv_url = self._start_download()
        values = self._read_csv(csv_url)
        vals = self._save_into_odoo(values)
        self._schedule_notification(vals)
        return vals
