import { createHashRouter } from "react-router";
import { Timesheet } from "./Timesheet";
import { Dashboard, TimeSheetCalendar } from "./pages";

export const routerApp = createHashRouter([
  {
    path: "",
    Component: Timesheet,
    children: [
      { path: "", Component: Dashboard },
      { path: "dashboard", Component: Dashboard },
      { path: "calendar", Component: TimeSheetCalendar },
    ],
  },
]);
