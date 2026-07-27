import { useTimesheet } from "@/context/timesheet";
import type { Phase, Task, TimeEntry } from "@/types/models";
import { TimeEntryCell } from "./taskgrid-entries-cell";
import { useCallback } from "react";

type TaskGridEntriesTBodyProps = {
  phase: Phase;
  onChange?: (val: TimeEntry) => void;
};

export function TaskGridEntriesTBody(props: TaskGridEntriesTBodyProps) {
  const { rangeDate } = useTimesheet();
  const renderCols = useCallback(
    (task: Task) => {
      return rangeDate.map((date) => {
        const entryKey = date.date.toISOString().split("T")[0];
        const entry: TimeEntry | null = task.entries[entryKey];
        return (
          <TimeEntryCell
            entry={entry}
            date={date.date}
            phaseId={props.phase.id}
            task={task}
            key={entryKey}
          />
        );
      });
    },
    [props.phase.id, rangeDate],
  );
  const renderRows = props.phase.tasks.map((task) => {
    return (
      <tr key={`task_${task.id}`}>
        <td>{task.name}</td>
        {renderCols(task)}
      </tr>
    );
  });
  return <tbody>{renderRows}</tbody>;
}
