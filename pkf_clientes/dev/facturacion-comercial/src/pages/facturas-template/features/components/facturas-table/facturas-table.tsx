import { useNavigate } from "react-router";
import { useFacturas } from "@/pages/facturas-template/features/hooks";
import { formatNumber } from "@/pages/facturas-template/features/components/form/utils";
import { useEffect } from "react";
import { Loader } from "@/widgets/loader";

export function FacturasTable(props: { active?: boolean }) {
  const navigate = useNavigate();
  const { facturas, getFacturas, loading } = useFacturas();

  useEffect(() => {
    getFacturas([["active", "=", props.active ?? true]]);
  }, [props.active]);
  return (
    <div className="d-flex flex-column flex-grow-1 min-h overflow-y-auto scrollbar-thin mt-2">
      <Loader show={loading} />
      <table className="table table-hover">
        <thead className="position-sticky sticky-top bg-white">
          <tr>
            <th>Cliente</th>
            <th>Rfc</th>
            <th>Moneda</th>
            <th>Tipo</th>
            <th>Referencia</th>
            <th>Observaciones</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map((fact) => {
            return (
              <tr
                key={fact.id}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/factura-template/form/${fact.id}`, {
                    state: { title: fact.razonsocial },
                  })
                }
              >
                <td>{fact.razonsocial}</td>
                <td>{fact.rfc}</td>
                <td>{fact.moneda}</td>
                <td>{fact.concepto}</td>
                <td>{fact.referencia}</td>
                <td>{fact.observaciones_template}</td>
                <td>{formatNumber(fact.total ?? 0)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
