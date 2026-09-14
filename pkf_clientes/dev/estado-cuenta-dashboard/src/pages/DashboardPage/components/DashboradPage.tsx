import { SaldosTable } from "./SaldosTable";
import { useDashboard } from "../hooks/useDashboard";

export function DashboardPage() {
  const { saldos, loading, searchClientes } = useDashboard();

  return (
    <div className="d-flex flex-column h-100 p-3">
      <div className="mb-3 row">
        <div className="col-3">
          <h5 className="fw-semibold text-muted">Saldo de Clientes</h5>
        </div>
        <div className="col-9">
          <input
            type="search"
            className="form-control w-50"
            id="search"
            placeholder="Buscar por cliente o codigo"
            onChange={searchClientes}
          />
        </div>
      </div>
      <SaldosTable saldos={saldos} loading={loading} />
    </div>
  );
}
