import { useEffect, useState, type MouseEvent } from "react";
import { EVSelect } from "@/components";
import { ProjectCard } from "./ProjectCard";
import { useTimesheetCalendarContext as useTSCContext } from "../hooks";

import { type Project } from "@/types/models";

interface ProjectSelectProps {
  onChange?: (item: Project) => void;
  onFocus?: () => void;
  projectSelected?: Project | null;
  noCargable?: boolean;
  onClickCard?: (e: MouseEvent<HTMLDivElement>) => void;
}

export function ProjectSelect(props: ProjectSelectProps) {
  const { projectRepository } = useTSCContext();
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async (value?: string) => {
    const data = await projectRepository.getByUser(value);
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, [projectRepository]);

  if (props.noCargable) {
    return (
      <div>
        <h5>Agregar horas no cargables</h5>
      </div>
    );
  }

  if (props.projectSelected) {
    return (
      <ProjectCard
        project={props.projectSelected}
        onClick={props.onClickCard}
      />
    );
  }

  return (
    <EVSelect<Project>
      itemSource={projects}
      keyExtractor={(x) => x.id}
      renderValue={(x) => x.name}
      onFocus={props.onFocus}
      filter={(val, item) =>
        item.name.toLowerCase().includes(val.toLowerCase())
      }
      onSearch={fetchProjects}
      onChange={props.onChange}
      renderItem={(x) => <span>{x.name}</span>}
      label="Selecciona un proyecto"
      className="text-muted"
      inputProps={{ className: "form-control" }}
      labelProps={{ className: "form-label fw-medium" }}
    />
  );
}
