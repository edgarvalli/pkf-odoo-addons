import logging
from odoo.api import Environment

from .grupos import GrupoService
from .clientes import ClienteService
from ..interfaces.responses import SyncClienteDict

logger = logging.getLogger(__name__)


class ComercialService:
    def __init__(self, env: Environment):
        self.grupo_srv = GrupoService(env)
        self.cliente_srv = ClienteService(env)

    def sync_clientes(self) -> SyncClienteDict:

        logger.info("Sincronizando grupos....")
        g_resp = self.grupo_srv.sync()

        logger.info("Sincronizando clientes....")
        c_resp = self.cliente_srv.sync()

        return {"grupos": g_resp, "clientes": c_resp}
