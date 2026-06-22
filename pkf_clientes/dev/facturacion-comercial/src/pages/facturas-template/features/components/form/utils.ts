import type {
  FacturaTemplate,
  FacturaTemplateMovimientos,
} from "@/pages/facturas-template/features/types/models";
import { observacionesValues } from "./constants";

export function formatNumber(num: number) {
  return num.toLocaleString("es-MX", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

export function sumNetoMovimiento(movimiento: FacturaTemplateMovimientos) {
  if (!movimiento.unidades || !movimiento.precio) return 0;
  return movimiento.unidades * movimiento.precio;
}

export function renderTemplate(data?: FacturaTemplate) {
  if (!data || !data.observaciones_template) return;
  const params = observacionesValues(data);
  const values = data.observaciones_template.replace(
    /\{\{(.*?)\}\}/g,
    (_, key) => {
      const val = params[key as keyof typeof params];
      return val ? String(val).trim() : "";
    },
  );

  return values;
}
