import { useDetalleSaldoCliente } from "../hooks/useDetalleSaldoCliente";
import { DetalleHeader } from "./DetalleHeader";
import { DetalleBody } from "./DetalleBody";
import { FacturasTable } from "./FacturasTable";
import "../styles.css";
import "@/styles/material-card.css";

export function DetalleSaldoCliente() {
  const { cliente, saldoPendiente, totalFacturas, facturas } =
    useDetalleSaldoCliente();
  return (
    <div className="d-flex flex-column h-100 p-3">
      <div className="material-card mb-2">
        <DetalleHeader cliente={cliente} />
        <DetalleBody saldo={saldoPendiente} facturasCount={totalFacturas} />
      </div>
      <FacturasTable facturas={facturas} />
    </div>
  );
}
