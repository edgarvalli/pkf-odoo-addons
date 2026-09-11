import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./theme/provider";
import { routerApp } from "./Router";
import { RouterProvider } from "react-router/dom";
import "./styles/app.css";

createRoot(document.getElementById("timesheet-app")!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={routerApp} />
    </AppProvider>
  </StrictMode>,
);
