import re
from dataclasses import dataclass
from openpyxl.worksheet.worksheet import Worksheet


@dataclass
class Template:
    name: str
    owner_email: str
    client_id: int
    budget: float
    cancelation: float
    note: str

    @classmethod
    def from_wb_sheet(cls, sheet: Worksheet, row: int):
        # 1. Validar nombre
        name_val = sheet.cell(row, 1).value
        if not name_val:  # Captura None y strings vacíos ""
            return None

        # 2. Validar email
        email_val = sheet.cell(row, 2).value
        if not email_val:
            return None

        email_str = str(email_val).strip()
        pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        if not re.fullmatch(pattern, email_str):
            return None

        # 3. Extraer y limpiar numéricos para evitar ValueErrors
        try:
            client_id_val = int(sheet.cell(row, 3).value)
            budget_val = float(sheet.cell(row, 4).value or 0.0)
            cancel_val = float(sheet.cell(row, 5).value or 0.0)
            notes_val = sheet.cell(row, 6).value or ""
        except (ValueError, TypeError):
            # Retorna None si los datos numéricos están corruptos o vacíos
            return None

        return cls(
            name=str(name_val).strip(),
            owner_email=email_str,
            client_id=client_id_val,
            budget=budget_val,
            cancelation=cancel_val,
            note=notes_val,
        )
