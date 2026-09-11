import { TableBody } from "./TableBody";
import { TableTitle } from "./TableTitle";
import type { TableInfoProps } from "./types";

export function TableInfo(props: TableInfoProps) {
  if (props.hide) return null;
  const fontSize = props.fontSize ?? 12;
  return (
    <table className="table" style={{ fontSize }}>
      <TableTitle title={props.title} />
      <TableBody items={props.items} />
    </table>
  );
}
