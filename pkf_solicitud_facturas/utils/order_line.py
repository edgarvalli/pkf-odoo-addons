from odoo.fields import Command


def create_solicitud_factura_line(order):
    lines = []
    for line in order.order_line:
        name_parts = line.name.split("\n", maxsplit=1)
        lines.append(
            Command.create(
                {
                    "concepto": name_parts[0],
                    "referencia": (name_parts[1] if len(name_parts) > 1 else ""),
                    "importe": line.price_subtotal,
                }
            )
        )

    return lines
