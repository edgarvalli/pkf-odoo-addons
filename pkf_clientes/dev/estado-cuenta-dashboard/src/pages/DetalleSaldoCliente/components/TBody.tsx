import { parseDateMX } from "@/utils/dates";
import { formatNumber } from "@/utils/numbers";
import type { Factura } from "@/types/models";
export function TBody({ facturas }: { facturas: Factura[] }) {
  const today = new Date();
  const translateStatus = {
    vigente: "Vigente",
    vencida30: "Vencido a mas 30 días",
    vencida60: "Vencido a mas 30 días",
    vencida: "Vencido",
  };

  const diasVencidas = (date: Date) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const utc2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    return Math.floor((utc1 - utc2) / msPerDay);
  };

  return (
    <tbody>
      {facturas.map((f) => (
        <tr key={f.id}>
          <td>{parseDateMX(f.fecha)}</td>
          <td>{f.serie}</td>
          <td>{f.folio}</td>
          <td>{f.uuid}</td>
          <td>{formatNumber(f.saldoPendiente)}</td>
          <td>{formatNumber(f.total)}</td>
          <td>{diasVencidas(f.fecha)}</td>
          <td>{translateStatus[f.estatus]}</td>
        </tr>
      ))}
    </tbody>
  );
}
