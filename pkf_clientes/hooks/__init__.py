from .ir_cron import configure_ir_cron_sync_clientes_grupos_comercial


def post_init_hook(env):
    configure_ir_cron_sync_clientes_grupos_comercial(env)
