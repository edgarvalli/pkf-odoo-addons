import { formatNumber } from "@/utils/numbers";
import type { SaldoCliente } from "@/types/models";
import { useNavigate } from "react-router";

export function TBody({ saldos }: { saldos: SaldoCliente[] }) {
  const navigate = useNavigate();

  return (
    <tbody>
      {saldos.map((saldo) => (
        <tr
          key={saldo.cliente.id}
          className="cursor-pointer"
          onClick={() => navigate(`/detalle/${saldo.cliente.id}`)}
        >
          <td>{saldo.cliente.codigo}</td>
          <td>{saldo.cliente.razonSocial}</td>
          <td>{saldo.cliente.rfc}</td>
          <td>{saldo.cliente.grupo?.nombre}</td>
          <td className="text-end text-success">
            {formatNumber(saldo.saldoVigente)}
          </td>
          <td className="text-end text-warning">
            {formatNumber(saldo.saldoVencido30)}
          </td>
          <td className="text-end text-orange">
            {formatNumber(saldo.saldoVencido60)}
          </td>
          <td className="text-end text-danger fw-bold">
            {formatNumber(saldo.saldoVencido)}
          </td>
          <td className="text-end fw-semibold text-primary">
            {formatNumber(saldo.saldoTotalPendiente)}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
