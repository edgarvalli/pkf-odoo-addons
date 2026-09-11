import type { TableKeyPair } from "./types";
export function TableRow(props: TableKeyPair) {
  const firstCellWidth = props.firstCellWidth ?? 80;
  return (
    <tr>
      <td width={firstCellWidth} className="text-muted fw-medium">
        {props.label}
      </td>
      <td className="text-muted">{props.text}</td>
    </tr>
  );
}
