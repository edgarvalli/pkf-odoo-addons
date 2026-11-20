import type { Factura } from "src/types/models";
import { THead } from "./THead";
import { TBody } from "./TBody";

export function FacturasTable(props: {
  facturas: Factura[];
  references: string[];
  onReferenceChange?: (value: string[]) => void;
  referenceSelected?: string[];
}) {
  return (
    <div className="d-flex flex-column flex-grow-1 table-responsive bg-white overflow-auto min-h-0">
      <table className="table fs-12px rounded-3">
        <THead
          references={props.references}
          onChange={props.onReferenceChange}
          value={props.referenceSelected}
        />
        <TBody facturas={props.facturas} />
      </table>
    </div>
  );
}
