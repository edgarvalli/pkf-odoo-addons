import { parseISODate } from "@/utils/dates";
import type { DashboardTRowsProps } from "../types";

function EmptyRows({ cellSize, days }: DashboardTRowsProps) {
  return Array.from({ length: 5 }).map((_, i) => (
    <tr key={`row_table_${i}`}>
      <td></td>
      {days.map((day, j) => (
        <td
          key={`${parseISODate(day)}${j}`}
          style={{ width: cellSize, height: cellSize }}
        />
      ))}
    </tr>
  ));
}

export function DashboardTRows(props: DashboardTRowsProps) {
  const { projects, days, cellSize, isEmpty, findValueInDate } = props;

  if (isEmpty) return <EmptyRows {...props} />;

  return (
    <>
      {projects.map((p) => {
        if (!p.id) return null;
        return (
          <tr key={`row_table_${p.id}`}>
            <td>{p.name}</td>
            {days.map((day, j) => {
              const value = findValueInDate?.(p.id, day) ?? 0;
              return (
                <td
                  key={`${parseISODate(day)}${j}`}
                  style={{ width: cellSize, height: cellSize }}
                >
                  <span style={{ color: value === 0 ? "#e1e1e1" : "#424242" }}>
                    {value}
                  </span>
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}
