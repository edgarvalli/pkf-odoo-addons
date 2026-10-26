import uuid

from ..utils.dates import fecha_mx
from ..models.factura import Factura
from ..models.context import Context, Group
from ..repositories.estado_cuenta import EstadoCuentaRepository


class ContextBuilder:

    def __init__(self, repo: EstadoCuentaRepository):
        self.uid = str(uuid.uuid4())
        self.repo = repo

    def _build_emails(
        self,
        factura: Factura,
        emails: list[str] | None = None,
    ) -> str:
        emails_list = [
            email.strip()
            for email in (factura.emails or "").split(",")
            if email.strip()
        ]

        if emails:
            emails_list.extend(email.strip() for email in emails if email.strip())

        return ",".join(dict.fromkeys(emails_list))

    def _build_context(
        self,
        factura: Factura,
        emails: list[str] | None = None,
    ) -> Context:
        return Context(
            uid=self.uid,
            emails=self._build_emails(factura, emails),
            id=factura.cliente.id,
            codigo=factura.cliente.codigo,
            razonsocial=factura.cliente.nombre,
            rfc=factura.cliente.rfc,
            fecha=fecha_mx(factura.fecha),
        )

    def build(
        self,
        facturas: list[Factura],
        emails: list[str] | None = None,
    ) -> list[Context]:
        contexts: dict[int, Context] = {}

        for factura in facturas:
            cliente_id = factura.cliente.id

            if cliente_id not in contexts:
                contexts[cliente_id] = self._build_context(factura, emails)

            context = contexts[cliente_id]

            group = context.facturas_group.setdefault(
                factura.estatus, Group(estatus=factura.estatus)
            )

            group.facturas.append(factura)

        return list(contexts.values())
