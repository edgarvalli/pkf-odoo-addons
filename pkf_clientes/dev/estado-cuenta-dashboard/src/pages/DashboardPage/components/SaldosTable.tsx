import { THead } from "./THead";
import { TBody } from "./TBody";
import { TBodySkeleton } from "./TBodySkeleton";
import { SaldosHelper } from "./SaldosHelper";
import type { SaldoCliente } from "@/types/models";

interface SaldosTableProps {
  saldos: SaldoCliente[];
  loading?: boolean;
}
import "@/styles/material-table.css";

export function SaldosTable({ saldos, loading }: SaldosTableProps) {
  return (
    <div className="d-flex flex-column flex-grow-1 overflow-auto min-h-0">
      <table className="material-table fs-12px table-hover">
        <THead />
        <TBodySkeleton hide={!loading} />
        <TBody saldos={saldos} />
      </table>
      <SaldosHelper hide={saldos.length > 0 && !loading} />
    </div>
  );
}

SaldosTable.THead = THead;
