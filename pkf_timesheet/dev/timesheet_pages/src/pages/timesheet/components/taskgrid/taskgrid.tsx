import { useTimesheet } from "@/context/timesheet";
import { TaskGridEntries } from "./taskgrid-entries";
import { TaskGridInit } from "./taskgrid-init";
import "./taskgrid.css";

export function TimesheetTaskGrid() {
  const ctx = useTimesheet();
  if (!ctx.project) return <TaskGridInit />;
  return <TaskGridEntries />;
}
