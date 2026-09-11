import { Outlet } from "react-router";
import { Sidebar } from "./components";
export function Timesheet() {
  return (
    <div className="timesheet-container">
      <div className="timesheet-sidebar bg-white">
        <Sidebar />
      </div>
      <div className="timesheet-content">
        <Outlet />
      </div>
    </div>
  );
}
