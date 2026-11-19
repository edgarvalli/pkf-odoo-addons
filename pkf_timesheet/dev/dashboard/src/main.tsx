import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { AppProvider, routerPath } from "@/app";

createRoot(document.getElementById("timesheet-dashboard")!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={routerPath} />
    </AppProvider>
  </StrictMode>,
);
