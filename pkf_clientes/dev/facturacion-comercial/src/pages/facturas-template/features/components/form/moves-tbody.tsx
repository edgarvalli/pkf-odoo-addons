import type { FacturaTemplate } from "@/pages/facturas-template/features/types/models";
import type { FormBaseProps } from "./types";
import { sumNetoMovimiento, formatNumber } from "./utils";

function createMovesActions(form: FormHook<FacturaTemplate>) {
  const handleChange = (
    key: "unidades" | "precio" | "segmento",
    value: any,
    index: number,
  ) => {
    form.setData((prev) => {
      if (!prev.movimientos) return prev;

      const movimientos = [...prev.movimientos];

      movimientos[index] = {
        ...movimientos[index],
        [key]: Number(value),
      };

      movimientos[index].neto = Number(sumNetoMovimiento(movimientos[index]));

      return {
        ...prev,
        movimientos,
      };
    });
  };

  const removeMovimiento = (index: number) => {
    form.setData((prev) => ({
      ...prev,
      movimientos: prev.movimientos?.filter((_, idx) => idx !== index) ?? [],
    }));
  };

  return { handleChange, removeMovimiento };
}

export function MovesTBody({ form }: FormBaseProps) {
  const { handleChange, removeMovimiento } = createMovesActions(form);
  return (
    <tbody>
      {form.data.movimientos?.map((mov, i) => {
        return (
          <tr key={`mov-${mov.idproducto}-${i}`}>
            <td>{mov.codigo_producto}</td>
            <td>{mov.producto}</td>
            <td>
              <input
                type="text"
                placeholder="0.00"
                className="form-control border-top-0 border-start-0 border-end-0"
                value={mov.unidades}
                onChange={(e) => handleChange("unidades", e.target.value, i)}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control border-top-0 border-start-0 border-end-0"
                value={mov.precio}
                onChange={(e) => handleChange("precio", e.target.value, i)}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control border-top-0 border-start-0 border-end-0"
                value={mov.segmento ?? ""}
                name="segmento"
                onChange={(e) => handleChange("segmento", e.target.value, i)}
              />
            </td>
            <td>{formatNumber((mov.precio ?? 0) * (mov.unidades ?? 1))}</td>
            <td>
              <i
                className="fa fa-trash text-primary"
                onClick={() => removeMovimiento(i)}
                style={{ cursor: "pointer" }}
              ></i>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
