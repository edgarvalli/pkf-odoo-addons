import { EVSelect } from "@/components";
import type { Task, Phase } from "@/types/models";
import { useEffect, useState } from "react";

interface TaskSelectProps {
  hide?: boolean;
  phase?: Phase | null;
  onChange?: (task: Task) => void;
}

export function TaskSelect(props: TaskSelectProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!props.phase) return;
    setTasks(props.phase.tasks);
  }, [props.phase]);

  if (props.hide) return null;

  return (
    <EVSelect<Task>
      itemSource={tasks}
      onChange={props.onChange}
      renderItem={(x) => <span>{x.name}</span>}
      renderValue={(x) =>
        x.name.length > 50 ? `${x.name.slice(0, 50)}...` : x.name
      }
      keyExtractor={(x) => x.id}
      filter={(v, x) => x.name.toLowerCase().includes(v.toLowerCase())}
      label="Selecciona una tarea"
      className="text-muted"
      inputProps={{ className: "form-control" }}
      labelProps={{ className: "form-label fw-medium" }}
    />
  );
}
