import { type MouseEvent } from "react";
import type { Project, TimeEntry } from "@/types/models";
import { parseDateMX } from "@/utils/dates";
import { Avatar } from "@/components";

interface ProjectCardProps {
  project: Project;
  entry?: TimeEntry;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      className="card shadow-sm mb-3 cursor-pointer hover-gray"
      onClick={onClick}
    >
      <div className="card-header d-flex align-items-center">
        <Avatar
          imageB64={project.partner.avatar}
          alt={project.partner.name}
          className="me-3"
        />
        <div>
          <h5 className="mb-0">{project.name}</h5>
          <small className="text-muted">{project.partner.name}</small>
        </div>
      </div>
      <div className="card-body">
        <small className="text-muted me-3 fw-bold">
          {project.period.open ? "Perodo abierto" : "Periodo restringido"}:
        </small>
        <small className="text-muted" style={{ fontSize: 10 }}>
          {parseDateMX(project.period.startDate)} -{" "}
          {parseDateMX(project.period.endDate)}
        </small>
      </div>
    </div>
  );
}
