import { EVSelect } from "@/components";
import { useOrm } from "@/hooks/useOrm";
import { useEffect, useState } from "react";
import type { Task } from "@/types/models";

interface NoCargableSelectProps {
  hide?: boolean;
  onChange?: (task: Task) => void;
}

export function NoCargableSelect(props: NoCargableSelectProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const orm = useOrm();

  const fetchTask = async () => {
    if (props.hide) return;
    const response = await orm.searchRead<Task>("pkf.timesheet.project.task", [
      ["include_in_cost", "=", false],
    ]);

    if (response) {
      setTasks(response);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [props.hide]);

  if (props.hide) return null;
  return (
    <EVSelect<Task>
      renderValue={(x) => x.name}
      renderItem={(x) => <span>{x.name}</span>}
      itemSource={tasks}
      onChange={props.onChange}
      keyExtractor={(x) => x.id}
      filter={(val, task) => {
        return task.name.toLowerCase().includes(val.toLowerCase());
      }}
      label="Selecciona una tarea no cargable"
      className="text-muted"
      inputProps={{ className: "form-control" }}
      labelProps={{ className: "form-label fw-medium" }}
    />
  );
}
