import { useEffect, useState } from "react";
import { useTimesheet } from "@/context/timesheet";
import type { TimeEntry } from "@/types/models";
import { useTaskActions } from "@/hooks/use-task-actions";
import type { TimeEntryCellProps } from "./types";

// Componente de celda aislado
export function TimeEntryCell(props: TimeEntryCellProps) {
  const { date, task, phaseId, entry } = props;
  const { project, isAllowedDateInProject } = useTimesheet();
  const { addEntryToTask } = useTaskActions();
  const [localValue, setLocalValue] = useState(
    entry ? String(entry.hours) : "",
  );

  const isAllowed = isAllowedDateInProject(date);

  const handleBlur = () => {
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
  };

  // Si el valor externo cambia, actualizamos el local (Sincronización)
  useEffect(() => {
    setLocalValue(entry ? String(entry.hours) : "");
  }, [entry?.hours]);

  return (
    <td className={isAllowed ? "" : "bg-body-secondary"}>
      {isAllowed ? (
        <input
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
        />
      ) : (
        <span>{localValue}</span>
      )}
    </td>
  );
}
