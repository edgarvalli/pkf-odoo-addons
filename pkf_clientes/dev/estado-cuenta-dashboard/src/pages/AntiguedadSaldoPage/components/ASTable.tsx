import { useNavigate } from "react-router";
import { useASContext } from "../hooks/useASContext";
import { formatNumber } from "@/utils/numbers";

export function ASTable() {
  const { saldos } = useASContext();
  const navigate = useNavigate();
  return (
    <table className="table table-hover" style={{ fontSize: 12 }}>
      <thead className="sticky-top bg-white">
        <tr>
          <th>Cliente</th>
          <th>Rfc</th>
          <th>Estatus</th>
          <th>Saldo Vencido</th>
        </tr>
      </thead>
      <tbody>
        {saldos
          .toSorted((a, b) => a.saldoTotal + b.saldoTotal)
          .slice(0, 30)
          .map((s) => (
            <tr
              key={s.cliente.id}
              onClick={() => navigate(`estado-cuenta/detalle/${s.cliente.id}`)}
              className={`cursor-pointer ${s.cliente.estatus === "INCOBRABLE" ? "text-danger" : ""}`}
            >
              <td>{s.cliente.razonSocial}</td>
              <td>{s.cliente.rfc}</td>
              <td>{s.cliente.estatus}</td>
              <td className="fw-semibold">{formatNumber(s.saldoTotal)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
