import type { Phase, TimeEntry } from "@/types/models";
import { TaskGridEntriesTBody } from "./taskgrid-entries-tbody";
import { TaskGridEntriesTHead } from "./taskgrid-entries-thead";

export function TaskGridEntriesTable({
  phase,
  onChange,
}: {
  phase: Phase | null;
  onChange?: (entry: TimeEntry) => void;
}) {
  if (!phase) return <></>;

  return (
    <div className="ev-taskgrid">
      <table>
        <TaskGridEntriesTHead phase={phase} />
        <TaskGridEntriesTBody phase={phase} onChange={onChange} />
      </table>
    </div>
  );
}
