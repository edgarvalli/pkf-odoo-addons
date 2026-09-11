import { parseISODate } from "@/utils/dates";
import type { DashboardTRowsProps } from "../types";
import { useCallback } from "react";

export function DashboardTFooter(props: DashboardTRowsProps) {
  const {
    days,
    cellSize,
    totalizeByDate,
    findValueInDateNoCost,
    totalValueInDate,
  } = props;

  const buildTextColor = (total: number) => {
    if (total === 0) return "text-disabled";
    if (total < 8) return "text-warning";
    if (total <= 14) return "text-primary";
    return "text-danger";
  };

  const renderCells = useCallback(
    (buildValue: (day: Date) => number) => {
      return days.map((day, j) => {
        const value = buildValue(day);
        return (
          <td
            key={`${parseISODate(day)}${j}`}
            style={{ width: cellSize, height: cellSize }}
            className={buildTextColor(value)}
          >
            {value}
          </td>
        );
      });
    },
    [days, cellSize],
  );

  return (
    <tfoot>
      <tr>
        <td>Horas cargables</td>
        {renderCells((day) => Number(totalValueInDate?.(day)))}
      </tr>

      <tr>
        <td>Horas no cargables</td>
        {renderCells((day) => Number(findValueInDateNoCost?.(day)))}
      </tr>

      <tr>
        <td>Total Horas</td>
        {renderCells((day) => Number(totalizeByDate?.(day)))}
      </tr>
    </tfoot>
  );
}
