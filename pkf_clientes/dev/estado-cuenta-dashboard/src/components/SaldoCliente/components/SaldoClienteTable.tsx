import { THead } from "./THead";
import { TBody } from "./TBody";
import { TBodySkeleton } from "./TBodySkeleton";
import { SaldosHelper } from "./SaldosHelper";

import type { SaldosTableProps } from "../types";

export function SaldoClienteTable({
  saldos,
  loading,
  tableId,
}: SaldosTableProps) {
  return (
    <div className="d-flex flex-column flex-grow-1 table-responsive overflow-auto min-h-0 bg-white rounded-3">
      <table className="table table-hover fs-12px" id={tableId}>
        <THead />
        <TBodySkeleton hide={!loading} />
        <TBody saldos={saldos} />
      </table>
      <SaldosHelper hide={saldos.length > 0 && !loading} />
    </div>
  );
}

SaldoClienteTable.THead = THead;
SaldoClienteTable.TBody = TBody;
