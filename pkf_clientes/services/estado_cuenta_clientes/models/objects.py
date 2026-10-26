from typing import Literal
from dataclasses import dataclass

Estatus = Literal["vencido", "vencida60", "vencida30", "vigente"]


@dataclass
class Base:
    id: int = 0
    codigo: str = ""
    nombre: str = ""


@dataclass
class Cliente(Base):
    rfc: str = ""


@dataclass
class Grupo(Base):
    active: bool = True
