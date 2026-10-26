import type { ChangeEvent } from "react";

interface SaldosHeaderProps {
  searchClientes?: (e: ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
  downloadReport?: () => void;
}
export function SaldosHeader(props: SaldosHeaderProps) {
  return (
    <header className="d-flex flex-column flex-xl-row align-items-xl-center justify-content-between gap-3 mb-3">
      <div className="flex-shrink-0">
        <h5 className="fw-semibold text-muted mb-1">Saldo de Clientes</h5>
        <small className="text-secondary">Consulta y descarga de saldos</small>
      </div>

      <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2">
        <div className="input-group">
          <span className="input-group-text">
            <i className="fa fa-search" aria-hidden="true" />
          </span>
          <input
            type="search"
            className="form-control"
            id="search"
            placeholder="Buscar cliente, código o grupo..."
            aria-label="Buscar clientes"
            onChange={props.searchClientes}
          />
        </div>

        <button
          className="btn btn-primary dropdown-toggle text-nowrap w-100"
          type="button"
          onClick={props.downloadReport}
        >
          <i className="fa fa-download me-2" />
          Descargar reporte
        </button>
      </div>
    </header>
  );
}
