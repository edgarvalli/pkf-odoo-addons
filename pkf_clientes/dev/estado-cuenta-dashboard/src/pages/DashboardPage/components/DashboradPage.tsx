import { SaldosTable } from "./SaldosTable";
import { useDashboard } from "../hooks/useDashboard";
import { SaldosHeader } from "./SaldosHeader";

export function DashboardPage() {
  const { saldos, loading, tableId, downloadReport, searchClientes } =
    useDashboard();

  return (
    <div className="d-flex flex-column h-100 p-3">
      <SaldosHeader
        loading={loading}
        searchClientes={searchClientes}
        downloadReport={downloadReport}
      />
      <SaldosTable saldos={saldos} loading={loading} tableId={tableId} />
    </div>
  );
}
