import { Placeholder } from "@/components";
import { useNavigate } from "react-router";
import { formatNumber } from "@/utils/numbers";

import type { DetalleHeaderPorps } from "../types";

type ValuePlaceholderProps = {
  value?: string | number | null;
  placeholder?: boolean;
};

function ValuePlaceholder({ value, placeholder }: ValuePlaceholderProps) {
  if (placeholder) return <Placeholder />;
  return <>{value || "—"}</>;
}

export function DetalleHeader(props: DetalleHeaderPorps) {
  const { cliente, saldo, facturasCount } = props;
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column h-100">
      {/* Título */}
      <div className="d-flex mb-2 gap-2 align-items-center">
        <button
          type="button"
          className="btn btn-light btn-sm"
          onClick={() => navigate("/")}
        >
          <i className="fa fa-arrow-left" />
        </button>

        <span className="fw-semibold">Detalle de saldo</span>
      </div>

      {/* Tarjetas horizontales */}
      <div className="row g-2 mb-2">
        {/* Cliente */}
        <div className="col-12 col-lg-6">
          <div className="p-3 bg-white border rounded-3 h-100 shadow-sm">
            <div className="d-flex gap-2 mb-2 align-items-center">
              <div className="p-2 rounded bg-light">
                <i className="text-secondary fa fa-building" />
              </div>

              <span className="text-muted fw-semibold small">
                INFORMACIÓN DEL CLIENTE
              </span>
            </div>

            <div className="mb-2 fw-semibold text-dark text-truncate">
              <ValuePlaceholder
                value={cliente?.razonSocial}
                placeholder={!cliente}
              />
            </div>

            <div className="d-flex flex-wrap gap-3 text-muted small">
              <span>
                Código:{" "}
                <strong className="text-dark">
                  <ValuePlaceholder
                    value={cliente?.codigo}
                    placeholder={!cliente}
                  />
                </strong>
              </span>

              <span>
                RFC:{" "}
                <strong className="text-dark">
                  <ValuePlaceholder
                    value={cliente?.rfc}
                    placeholder={!cliente}
                  />
                </strong>
              </span>
            </div>

            <div className="d-flex flex-wrap gap-3 mt-1 text-muted small">
              <span>
                <i className="me-1 fa fa-users" />
                <ValuePlaceholder
                  value={cliente?.grupo?.nombre}
                  placeholder={!cliente}
                />
              </span>

              {cliente?.emails && (
                <span className="text-truncate text-primary">
                  <i className="me-1 fa fa-envelope-o" />
                  {cliente.emails}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Saldo */}
        <div className="col-6 col-lg-3">
          <div className="p-3 bg-white border rounded-3 h-100 shadow-sm">
            <div className="d-flex gap-2 mb-3 align-items-center">
              <i className="text-primary fa fa-money" />
              <span className="text-muted fw-semibold small">
                SALDO PENDIENTE
              </span>
            </div>

            <div className="fs-4 fw-bold text-dark text-truncate">
              <ValuePlaceholder
                value={formatNumber(saldo)}
                placeholder={!cliente}
              />
            </div>

            <small className="text-muted">Saldo total del cliente</small>
          </div>
        </div>

        {/* Facturas */}
        <div className="col-6 col-lg-3">
          <div className="p-3 bg-white border rounded-3 h-100 shadow-sm">
            <div className="d-flex gap-2 mb-3 align-items-center">
              <i className="text-primary fa fa-file-text-o" />
              <span className="text-muted fw-semibold small">FACTURAS</span>
            </div>

            <div className="fs-4 fw-bold text-dark">
              <ValuePlaceholder value={facturasCount} placeholder={!cliente} />
            </div>

            <small className="text-muted">Documentos registrados</small>
          </div>
        </div>
      </div>
    </div>
  );
}
