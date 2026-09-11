import { useMemo } from "react";
import type { TimeEntry } from "src/types/models";
import { EVModal, TableInfo } from "@/components";

export function ShowMoreEntry(props: {
  entries: TimeEntry[];
  onClose?: () => void;
  onEntrySelect?: (entry: TimeEntry) => void;
  open?: boolean;
}) {
  const totalHours = useMemo(
    () => props.entries.reduce((total, item) => total + item.hours, 0),
    [props.entries],
  );

  return (
    <EVModal
      open={props.open}
      title={`Total horas ${totalHours}`}
      onClose={props.onClose}
    >
      <EVModal.Body>
        <ul
          className="list-group list-group-flush"
          style={{ overflowY: "auto" }}
        >
          {props.entries.map((e) => {
            return (
              <li
                className="list-group-item cursor-pointer hover-gray"
                key={e.id}
                onClick={() => props.onEntrySelect?.(e)}
              >
                <TableInfo
                  title={e.task.name}
                  items={[
                    { label: "Projecto:", text: e.project.name },
                    { label: "Rubro:", text: e.phase.name },
                  ]}
                />
                <div className="d-flex justify-content-end">
                  <div style={{ fontSize: 12 }} className="d-flex gap-3">
                    <span className="fw-medium text-muted">Horas:</span>
                    <small className="rounded-circle bg-primary text-white badge">
                      {e.hours}
                    </small>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </EVModal.Body>
    </EVModal>
  );
}
