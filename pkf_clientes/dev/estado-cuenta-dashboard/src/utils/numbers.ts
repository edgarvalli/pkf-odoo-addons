export function formatNumber(value: any) {
  return Number(value).toLocaleString("es-MX", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}
