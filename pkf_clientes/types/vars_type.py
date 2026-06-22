from typing import TypedDict

class Vars(TypedDict):
    year: int
    month: str
    current_payment: int
    total_payment: int
    reference: str