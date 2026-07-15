import { Sidebar } from "./components/sidebar/sidebar";
import { TimesheetTaskGrid } from "./components/taskgrid";
import { TimesheetProvider } from "@/context/timesheet";
import { EntryRangeUI } from "./components/entry-range/entry-range";

import "./styles/timesheet.css";
import "./styles/timesheet-desktop.css";

export default function Timesheet() {
  return (
    <TimesheetProvider>
      <div className="d-flex flex-grow-1">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <TimesheetTaskGrid />
          <EntryRangeUI className="d-block d-sm-none" />
        </div>
      </div>
    </TimesheetProvider>
  );
}
