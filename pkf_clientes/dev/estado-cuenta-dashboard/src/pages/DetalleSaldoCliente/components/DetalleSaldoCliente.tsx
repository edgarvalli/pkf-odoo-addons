import { useDetalleSaldoCliente } from "../hooks/useDetalleSaldoCliente";
import { DetalleHeader } from "./DetalleHeader";
import { FacturasTable } from "./FacturasTable";
import "../styles.css";
import "@/styles/material-card.css";

export function DetalleSaldoCliente() {
  const {
    cliente,
    saldoPendiente,
    totalFacturas,
    facturas,
    references,
    setReferenceSelected,
  } = useDetalleSaldoCliente();
  return (
    <div className="d-flex flex-column p-3 h-100">
      <div className="mb-2 material-card">
        <DetalleHeader
          cliente={cliente}
          saldo={saldoPendiente}
          facturasCount={totalFacturas}
        />
      </div>
      <FacturasTable
        facturas={facturas}
        references={references}
        onReferenceChange={setReferenceSelected}
      />
    </div>
  );
}
