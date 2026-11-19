import type { Factura } from "src/types/models";
import { THead } from "./THead";
import { TBody } from "./TBody";
import "@/styles/material-table.css";

export function FacturasTable(props: {
  facturas: Factura[];
  references: string[];
  onReferenceChange?: (value: string) => void;
}) {
  return (
    <div className="d-flex flex-column flex-grow-1 overflow-auto min-h-0">
      <table className="fs-12px material-table">
        <THead
          references={props.references}
          onChange={props.onReferenceChange}
        />
        <TBody facturas={props.facturas} />
      </table>
    </div>
  );
}
