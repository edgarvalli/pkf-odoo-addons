import { useEffect, useState } from "react";
import { useTimesheet } from "@/context/timesheet";
import type { Task, TimeEntry } from "@/types/models";
import { useTaskActions } from "@/hooks/use-task-actions";

// Componente de celda aislado
export function TimeEntryCell({
  date,
  task,
  phaseId,
  entry,
}: {
  date: Date;
  task: Task;
  phaseId: number;
  entry: TimeEntry | null;
}) {
  const { project } = useTimesheet();
  const { addEntryToTask } = useTaskActions();
  const [localValue, setLocalValue] = useState(
    entry ? String(entry.hours) : "",
  );

  // Si el valor externo cambia, actualizamos el local (Sincronización)
  useEffect(() => {
    setLocalValue(entry ? String(entry.hours) : "");
  }, [entry?.hours]);

  return (
    <td>
      <input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={() => {
          const hours = Number(localValue);

          // Evitamos que se envien caracters
          if (Number.isNaN(hours)) {
            setLocalValue("");
            return;
          }
          // Evitamos disparar la acción si el valor no cambió realmente
          if (entry?.hours === hours || hours === 0) return;

          const newEntry: TimeEntry = {
            id: entry?.id ?? 0,
            task_id: task.id,
            phase_id: phaseId,
            project_id: project?.id ?? 0,
            date: entry?.date ?? date,
            hours: hours,
            note: "",
          };
          addEntryToTask(phaseId, task.id, newEntry);
        }}
      />
    </td>
  );
}
