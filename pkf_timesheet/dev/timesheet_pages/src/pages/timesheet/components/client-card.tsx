import { useTimesheet } from "../context";
import { b64ToSource } from "../tools";
import type { ClientCardProps } from "../types/client-card";

export function ClientCard(props: ClientCardProps) {
  const { project } = useTimesheet();
  if (props.hidde || !project) return <></>;
  return (
    <div className="d-flex flex-column gap-2">
      <span className="text-muted fw-bold" style={{ fontSize: 12 }}>
        Cliente
      </span>
      <div className="d-flex gap-3 align-items-center">
        <img
          src={b64ToSource(project.client.avatar)}
          alt="avatar"
          className="rounded-circle"
          width={40}
          height={40}
        />
        <span className="pointer text-primary" style={{ fontSize: 14 }}>
          {project.client.name}
        </span>
      </div>
    </div>
  );
}
