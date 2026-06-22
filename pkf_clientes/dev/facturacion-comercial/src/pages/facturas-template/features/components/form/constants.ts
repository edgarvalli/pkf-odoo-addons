import type { FacturaTemplate } from "@/pages/facturas-template/features/types/models";

export const observacionesValues = (data: FacturaTemplate) => {
  const today = new Date();
  const _month = today.toLocaleString("es-MX", { month: "long" });
  const month = _month.charAt(0).toUpperCase() + _month.slice(1);
  return {
    year: today.getFullYear(),
    month,
    MONTH: month.toUpperCase(),
    pago: data.pago,
    total_pago: data.total_pagos,
    referencia: data.referencia,
    razonsocial: data.razonsocial,
    rfc: data.rfc,
  };
};
