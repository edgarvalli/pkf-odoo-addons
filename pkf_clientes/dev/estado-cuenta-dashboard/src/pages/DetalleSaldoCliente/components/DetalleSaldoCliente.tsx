import { useDetalleSaldoCliente } from "../hooks/useDetalleSaldoCliente";
import { DetalleHeader } from "./DetalleHeader";
import { FacturasTable } from "./FacturasTable";
import "../styles.css";

export function DetalleSaldoCliente() {
  const {
    cliente,
    saldoPendiente,
    totalFacturas,
    facturas,
    references,
    referenceSelected,
    setReferenceSelected,
  } = useDetalleSaldoCliente();
  return (
    <div className="d-flex flex-column p-3 h-100">
      <div className="mb-2">
        <DetalleHeader
          cliente={cliente}
          saldo={saldoPendiente}
          facturasCount={totalFacturas}
        />
      </div>
      <FacturasTable
        facturas={facturas}
        references={references}
        referenceSelected={referenceSelected}
        onReferenceChange={setReferenceSelected}
      />
    </div>
  );
}
