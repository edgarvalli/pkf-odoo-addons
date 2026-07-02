from lxml import etree
from .models import Context, AttachmentContext


class ContextBuilder:

    @staticmethod
    def build_invoice(xml_bytes: bytes) -> Context:

        if not xml_bytes:
            return {}

        ns = {
            "cfdi": "http://www.sat.gob.mx/cfd/4",
            "tfd": "http://www.sat.gob.mx/TimbreFiscalDigital",
        }

        try:

            root: dict = etree.fromstring(xml_bytes)

            timbre: dict = root.find(
                ".//tfd:TimbreFiscalDigital",
                namespaces=ns,
            )

            if timbre is None:
                return {}

            receptor: dict = root.find(
                "cfdi:Receptor",
                namespaces=ns,
            )

            return Context(
                uuid=timbre.get("UUID"),
                rfc=receptor.get("Rfc", "") if receptor else "",
                razon_social=receptor.get("Nombre", "") if receptor else "",
                serie=root.get("Serie", ""),
                folio=root.get("Folio", ""),
            )

        except Exception as e:
            print(f"Error parseando XML: {str(e)}")
            return None

    @staticmethod
    def context_mapper(
        attachments: dict[str, AttachmentContext],
    ) -> dict[str, Context]:

        ctx_list: dict[str, Context] = {}

        for item in attachments.values():

            xml_ctx = item.context
            if not xml_ctx or not xml_ctx.uuid:
                continue

            uuid = xml_ctx.uuid

            if uuid not in ctx_list:

                ctx_list[uuid] = Context(
                    uuid=uuid,
                    idcliente=0,
                    rfc=xml_ctx.rfc,
                    razon_social=xml_ctx.razon_social,
                    serie=xml_ctx.serie,
                    folio=xml_ctx.folio,
                    emails="",
                    attachment_ids=[],
                )

            if item.attachment_ids:
                ctx_list[uuid].attachment_ids.extend(item.attachment_ids)

        return ctx_list
