import uuid
from datetime import datetime
from odoo.api import Environment
from .types import ContextType


class EstadoCuentaLogger:

    def __init__(self, env: Environment):
        self.env = env
        self.start_process = datetime.now()
        self.uid = str(uuid.uuid4())

        self.rfc = None
        self.razonsocial = None

    def log(self, message: str, status: str = "ok"):
        self.env["pkf.envios.logs"].create(
            {
                "uuid": self.uid,
                "fecha": datetime.now(),
                "cliente": self.razonsocial or "System",
                "rfc": self.rfc or "XAXX01010100",
                "estatus": status,
                "evento": message,
            }
        )

    def info(self, message):
        self.log(message)

    def error(self, message):
        self.log(message, "error")

    def set_context(self, ctx: ContextType):
        self.rfc = ctx.get("rfc")
        self.razonsocial = ctx.get("razonsocial")

    def send_bitacora(self, mail_server_id: int = None):
        self.env["pkf.envios.logs"].send_bitacora(
            uid=self.uid,
            start=self.start_process,
            end=datetime.now(),
            mail_server_id=mail_server_id,
        )
