from typing import TypedDict, Union, Literal
from datetime import datetime


class FacturacionJobItem(TypedDict):
    id: int
    jobId: int
    idComercial: Union[int, None]
    idTemplate: Union[int, None]
    status: Literal["Pending", "Processing", "Completed", "Failed"]
    serie: str
    folio: float
    uuid: Union[str, None]
    payloadJson: str
    errorMessage: Union[str, None]
    createdAt: Union[datetime, None]
    startedAt: Union[datetime, None]
    finishedAt: Union[datetime, None]
