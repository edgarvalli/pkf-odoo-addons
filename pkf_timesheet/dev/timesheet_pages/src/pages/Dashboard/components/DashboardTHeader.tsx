import { parseISODate } from "@/utils/dates";
export function DashboardTHeader({
  days,
  cellSize,
}: {
  days: Date[];
  cellSize: number;
}) {
  return (
    <thead className="sticky-top">
      <tr>
        <th style={{ width: 200 }}></th>
        {days.map((day) => (
          <th
            key={parseISODate(day)}
            style={{ width: cellSize, height: cellSize }}
          >
            {day.toLocaleDateString("es-MX", { day: "2-digit" })}
          </th>
        ))}
      </tr>
    </thead>
  );
}
