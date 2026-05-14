import { useTimesheet } from "@/context/timesheet";
import { b64ToSource } from "@/utils/tools";
import type { ClientCardProps } from "@/types/client-card";

export function ClientCard(props: ClientCardProps) {
  const { project, orm } = useTimesheet();
  if (props.hidde || !project) return <></>;

  const goToClient = async () => {
    return orm.doAction({
      type: "ir.actions.act_window",
      res_model: "res.partner",
      views: [[false, "form"]],
      res_id: project.id,
      target: "current",
    });
  };

  return (
    <div className={`d-flex flex-column gap-2 ${props.className}`}>
      <div className="d-flex gap-3 align-items-center" onClick={goToClient}>
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
