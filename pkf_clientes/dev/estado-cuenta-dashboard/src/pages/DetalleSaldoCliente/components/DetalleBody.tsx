import { formatNumber } from "@/utils/numbers";
export function DetalleBody(props: { saldo: number; facturasCount: number }) {
  return (
    <div className="material-card__body detalle-grid">
      <div>
        <h6>Saldo Pendiente</h6>
        <span>$ {formatNumber(props.saldo)}</span>
      </div>
      <div>
        <h6>Total Facturas</h6>
        <span>{props.facturasCount}</span>
      </div>
      <div>
        <h6>Moneda</h6>
        <span>Pesos Mexicanos</span>
      </div>
    </div>
  );
}
