import logging
from dataclasses import dataclass
from odoo.models import BaseModel


@dataclass
class UserProject:
    id: int
    email: str
    name: str
    projects: list

    @classmethod
    def from_basemodel(cls, obj: BaseModel) -> "UserProject":
        # Intentar obtener email desde res.users o hr.employee
        email = getattr(obj, "work_email", None) or getattr(obj, "email", None)
        return cls(id=obj.id, name=obj.name, email=email, projects=[])
