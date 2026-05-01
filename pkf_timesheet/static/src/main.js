import { registry } from "@web/core/registry";
import Dashboard from "./actions/dashboard/dashboard";
import TimeSheet from "./actions/timesheet/timesheet";

registry.category("actions").add("pkf_timesheet.TimeSheet", TimeSheet);
registry.category("actions").add("pkf_timesheet.Dashboard", Dashboard);
