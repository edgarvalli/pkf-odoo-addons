import { Sidebar } from "./components/sidebar";
import { TimesheetTaskGrid } from "./components/taskgrid";
import { TimesheetProvider } from "./context";
import "./timesheet.css";

export default function Timesheet() {
  return (
    <TimesheetProvider>
      <div className="d-flex h-100">
        <Sidebar />
        <TimesheetTaskGrid />
      </div>
    </TimesheetProvider>
  );
}
