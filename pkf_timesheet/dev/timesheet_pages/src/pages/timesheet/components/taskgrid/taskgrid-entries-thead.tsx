import { useTimesheet } from "@/context/timesheet";
import type { Phase } from "@/types/models";

export function TaskGridEntriesTHead({ phase }: { phase: Phase }) {
  const { rangeDate } = useTimesheet();

  return (
    <thead>
      <tr>
        <th>{phase.name}</th>
        {rangeDate.map((d) => (
          <th key={d.date.toISOString().split("T")[0]}>
            {d.label.slice(0, 3).toUpperCase()} <br />
            <span>{d.date.getDate()}</span>
          </th>
        ))}
      </tr>
    </thead>
  );
}
