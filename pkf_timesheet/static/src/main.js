import { registry } from "@web/core/registry";
import Dashboard from "./components/dashboard/dashboard";
import Timesheet from "./components/timesheet/timesheet";

registry.category("actions").add("pkf_timesheet.Timesheet", Timesheet);
registry.category("actions").add("pkf_timesheet.Dashboard", Dashboard);
