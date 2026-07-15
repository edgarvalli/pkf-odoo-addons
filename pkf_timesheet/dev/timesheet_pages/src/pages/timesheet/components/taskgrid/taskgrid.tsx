import { useTimesheet } from "@/context/timesheet";
import { TaskGridEntries } from "./taskgrid-entries";
import { TaskGridInit } from "./taskgrid-init";
import "./taskgrid.css";

export function TimesheetTaskGrid() {
  const ctx = useTimesheet();
  const Component = ctx.project ? TaskGridEntries : TaskGridInit;
  return (
    <div className="p-2 d-flex flex-grow-1 h-100">
      <div className="box w-100 p-2">
        <Component />
      </div>
    </div>
  );
}
