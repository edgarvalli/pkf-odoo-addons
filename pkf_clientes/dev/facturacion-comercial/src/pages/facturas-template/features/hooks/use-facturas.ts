import { useOrm } from "@/hooks";
import type { FacturaTemplate } from "@/pages/facturas-template/features/types/models";
import { useState } from "react";

export function useFacturas() {
  const [facturas, setFacturas] = useState<FacturaTemplate[]>([]);
  const orm = useOrm();
  const getFacturas = async (domain: any[] = []) => {
    const result = await orm.searchRead<FacturaTemplate>(
      "pkf.factura.template",
      domain,
      [
        "concepto",
        "moneda",
        "razonsocial",
        "codigo_cliente",
        "codigo_concepto",
        "rfc",
        "total",
        "referencia",
        "observaciones_template",
      ],
    );
    if (result) setFacturas(result);
  };

  return { facturas, setFacturas, getFacturas, loading: orm.fetching };
}
