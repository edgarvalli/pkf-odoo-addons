import { FilterReferenceCard } from "./FilterReferenceCard";
import type { FilterReferenceCardProps } from "../types";
export function THead(props: FilterReferenceCardProps) {
  return (
    <thead className="sticky-top bg-white">
      <tr>
        <th>Fecha</th>
        <th>Folio</th>
        <th>UUID</th>
        <th className="position-relative">
          Referencia <FilterReferenceCard {...props} />
        </th>
        <th>Pendiente</th>
        <th>Total</th>
        <th>Dias Vencidos</th>
        <th>Estatus</th>
      </tr>
    </thead>
  );
}
