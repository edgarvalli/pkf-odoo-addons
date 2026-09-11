import { TableRow } from "./TableRow";
import type { TableKeyPair } from "./types";

export function TableBody({ items }: { items: TableKeyPair[] }) {
  return (
    <tbody>
      {items.map((item, i) => (
        <TableRow {...item} key={item.label.replace(" ", "_") + i} />
      ))}
    </tbody>
  );
}
