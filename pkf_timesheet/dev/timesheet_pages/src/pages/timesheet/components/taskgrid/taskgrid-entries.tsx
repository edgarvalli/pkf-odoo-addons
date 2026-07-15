import { TaskGridEntriesTable } from "./taskgrid-entries-table";
import { TaskGridEntriesActionBar } from "./taskgrid-entries-actionbar";
import { useTaskGrid } from "./use-taskgrid";

export function TaskGridEntries() {
  const { snapTask, setValue, setPhaseSelected, phaseFromContext } =
    useTaskGrid();

  return (
    <div className="d-flex flex-column w-100 overflow-auto">
      <TaskGridEntriesActionBar
        phase={phaseFromContext}
        onChange={(phase) => {
          setPhaseSelected(phase);
          snapTask.current = phase?.tasks ?? [];
        }}
        onSearch={setValue}
      />
      <TaskGridEntriesTable phase={phaseFromContext} />
    </div>
  );
}
