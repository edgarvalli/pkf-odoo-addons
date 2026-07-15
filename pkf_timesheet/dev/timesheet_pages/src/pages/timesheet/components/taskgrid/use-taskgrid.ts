import { useEffect, useMemo, useRef, useState } from "react";
import { useTimesheet } from "@/context/timesheet";
import type { Phase, Task } from "@/types/models";

export function useTaskGrid() {
  const [value, setValue] = useState("");
  const [phaseSelected, setPhaseSelected] = useState<Phase | null>(null);
  const snapTask = useRef<Task[]>([]);
  const { project } = useTimesheet();

  // Obtenemos la fase directamente del proyecto del contexto usando el ID
  const phaseFromContext = useMemo(() => {
    if (!project || !phaseSelected) return null;
    const phase = project.phases.find((p) => p.id === phaseSelected.id);

    if (!phase) return null;

    // Aplicamos el filtro de búsqueda aquí mismo
    if (value) {
      return {
        ...phase,
        tasks: phase.tasks.filter((t) =>
          t.name.toLowerCase().includes(value.toLowerCase()),
        ),
      };
    }

    return phase;
  }, [project, phaseSelected, value]);

  useEffect(() => {
    if (!phaseSelected) return;
    let tasks = [];

    if (value) {
      tasks = phaseSelected.tasks.filter((task) => task.name.includes(value));
    } else {
      tasks = snapTask.current;
    }
    if (tasks) {
      setPhaseSelected((prev) => {
        if (!prev) return null;
        return { ...prev, tasks };
      });
    }
  }, [value]);

  return {
    value,
    phaseSelected,
    snapTask,
    project,
    setValue,
    setPhaseSelected,
    phaseFromContext,
  };
}
