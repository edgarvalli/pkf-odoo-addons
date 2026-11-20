import { useEstadoCuenta } from "../hooks/useEstadoCuenta";
import { SaldoClienteTable, SaldosHeader } from "@/components";
export function EstadoCuenta() {
  const { saldos, loading, tableId, downloadReport, searchClientes } =
    useEstadoCuenta();

  return (
    <div className="d-flex flex-column p-3 h-100">
      <SaldosHeader
        loading={loading}
        searchClientes={searchClientes}
        downloadReport={downloadReport}
      />
      <SaldoClienteTable saldos={saldos} loading={loading} tableId={tableId} />
    </div>
  );
}
