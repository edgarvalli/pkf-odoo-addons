import type { Phase, TimeEntry } from "@/types/models";
import { TaskGridEntriesTBody } from "./taskgrid-entries-tbody";
import { TaskGridEntriesTHead } from "./taskgrid-entries-thead";

type TaskGridEntriesTableProps = {
  phase: Phase | null;
  onChange?: (entry: TimeEntry) => void;
};

export function TaskGridEntriesTable(props: TaskGridEntriesTableProps) {
  const { phase, onChange } = props;
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
