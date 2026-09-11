import { EVSelect } from "@/components";
import { useEffect, useState } from "react";
import { useTimesheetCalendarContext } from "../hooks";
import { projectRepository } from "@/repositories";

import type { Phase } from "@/types/models";

interface PhaseSelectProps {
  projectId: number;
  hide?: boolean;
  onChange?: (phase: Phase) => void;
}

export function PhaseSelect(props: PhaseSelectProps) {
  const [items, setItems] = useState<Phase[]>([]);
  const { orm } = useTimesheetCalendarContext();

  const repo = projectRepository(orm);

  const fetchPhase = async () => {
    if (props.projectId == 0) return;
    const result = await repo.getById(props.projectId, true);
    if (!result) return;
    setItems(result.phases);
  };

  useEffect(() => {
    fetchPhase();
  }, [props.projectId]);

  if (props.hide) return null;

  return (
    <EVSelect<Phase>
      renderValue={(x) => x.name}
      itemSource={items}
      renderItem={(x) => <span>{x.name}</span>}
      onChange={props.onChange}
      filter={(val, item) =>
        item.name.toLowerCase().includes(val.toLowerCase())
      }
      keyExtractor={(x) => x.id}
      label="Selecciona un rubro"
      className="text-muted"
      inputProps={{ className: "form-control" }}
      labelProps={{ className: "form-label fw-medium" }}
    />
  );
}
