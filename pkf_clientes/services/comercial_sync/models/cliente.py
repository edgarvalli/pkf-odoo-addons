from dataclasses import dataclass, field

from .grupo import Grupo


@dataclass
class Cliente:
    id: int
    codigo: str
    razon_social: str
    rfc: str
    grupo: Grupo
    email: str | None = None
    emails: list[str] = field(default_factory=list)

    @classmethod
    def from_dict(cls, values: dict):
        data = values.copy()

        cls.parse_email(data)

        grupo = Grupo(
            id=data.pop("grupo_id", 0),
            codigo=data.pop("grupo_codigo", ""),
            nombre=data.pop("grupo_nombre", ""),
        )

        return cls(**data, grupo=grupo)

    @staticmethod
    def parse_email(data: dict):
        raw_emails = data.get("emails")

        if isinstance(raw_emails, str):
            emails = [email.strip() for email in raw_emails.split(",") if email.strip()]
        elif isinstance(raw_emails, list):
            emails = [
                email.strip()
                for email in raw_emails
                if isinstance(email, str) and email.strip()
            ]
        else:
            emails = []

        data["emails"] = emails

        # El primer correo será el principal si no viene uno explícito.
        if not data.get("email"):
            data["email"] = emails[0] if emails else None
