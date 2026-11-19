import { FilterReferenceCard } from "./FilterReferenceCard";
export function THead(props: {
  references: string[];
  onChange?: (value: string) => void;
}) {
  return (
    <thead>
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
