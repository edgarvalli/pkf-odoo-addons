import { THead } from "./THead";
import { TBody } from "./TBody";
import { TBodySkeleton } from "./TBodySkeleton";
import { SaldosHelper } from "./SaldosHelper";

import type { SaldosTableProps } from "../types";

export function SaldoClienteTable(props: SaldosTableProps) {
  return (
    <div className="d-flex flex-column flex-grow-1 table-responsive overflow-auto min-h-0 bg-white rounded-3">
      <table className="table table-hover fs-12px" id={props.tableId}>
        <THead />
        <TBodySkeleton hide={!props.loading} />
        <TBody {...props} />
      </table>
      <SaldosHelper hide={props.saldos.length > 0 && !props.loading} />
    </div>
  );
}

SaldoClienteTable.THead = THead;
SaldoClienteTable.TBody = TBody;
