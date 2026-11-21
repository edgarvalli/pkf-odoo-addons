import type { SaldosHeaderProps } from "../types";

export function SaldosHeader(props: SaldosHeaderProps) {
  return (
    <header
      className="
        d-flex flex-column flex-xl-row gap-3 mb-3 align-items-xl-center justify-content-between"
    >
      <div className="flex-shrink-0">
        {!props.hideTitle && (
          <>
            <h5 className="mb-1 fw-semibold text-muted">Saldo de Clientes</h5>
            <small className="text-secondary">
              Consulta y descarga de saldos
            </small>
          </>
        )}
      </div>

      <div className="d-flex flex-column flex-md-row gap-2 align-items-stretch align-items-md-center">
        {props.searchClientes && (
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa fa-search" aria-hidden="true" />
            </span>
            <input
              type="search"
              className="form-control bg-white"
              id="search"
              placeholder="Buscar cliente, código o grupo..."
              aria-label="Buscar clientes"
              onChange={props.searchClientes}
            />
          </div>
        )}

        {props.downloadReport && (
          <button
            className="btn btn-primary dropdown-toggle text-nowrap w-100"
            type="button"
            onClick={props.downloadReport}
          >
            <i className="me-2 fa fa-download" />
            Descargar reporte
          </button>
        )}
      </div>
    </header>
  );
}
