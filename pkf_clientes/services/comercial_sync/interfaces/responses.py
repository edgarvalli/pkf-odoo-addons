from typing import TypedDict


class SyncResponseDict(TypedDict):
    total: int = 0
    updated: int = 0
    created: int = 0


class SyncClienteDict(TypedDict):
    grupos: SyncResponseDict
    clientes: SyncResponseDict
