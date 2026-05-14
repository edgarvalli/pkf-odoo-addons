import { Sidebar } from "./components/sidebar/sidebar";
import { TimesheetTaskGrid } from "./components/taskgrid";
import { TimesheetProvider } from "@/context/timesheet";
import "./timesheet.css";
import { EntryRangeUI } from "./components/entry-range/entry-range";

export default function Timesheet() {
  return (
    <TimesheetProvider>
      <div className="d-sm-flex h-100 w-100 flex-column flex-lg-row d-none">
        <Sidebar />
        <TimesheetTaskGrid />
      </div>
      <EntryRangeUI className="d-block d-sm-none" />
    </TimesheetProvider>
  );
}
