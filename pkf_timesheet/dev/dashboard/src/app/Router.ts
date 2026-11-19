import { createHashRouter } from "react-router";
import { Dashboard } from "@/pages";

export const routerPath = createHashRouter([
  {
    path: "",
    Component: Dashboard,
  },
]);
