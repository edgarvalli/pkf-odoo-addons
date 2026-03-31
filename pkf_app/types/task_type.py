from typing import TypedDict
from datetime import datetime


class TaskProps(TypedDict):
    name: str
    model_id: int
    state: str
    nextcall: datetime
    interval_number: int
