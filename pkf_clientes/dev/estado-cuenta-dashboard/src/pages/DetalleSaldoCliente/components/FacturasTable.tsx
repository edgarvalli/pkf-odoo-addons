import type { Factura } from "src/types/models";
import { THead } from "./THead";
import { TBody } from "./TBody";
import "@/styles/material-table.css";

export function FacturasTable(props: { facturas: Factura[] }) {
  return (
    <div className="d-flex flex-column flex-grow-1 overflow-auto min-h-0">
      <table className="material-table fs-12px">
        <THead />
        <TBody facturas={props.facturas} />
      </table>
    </div>
  );
}
