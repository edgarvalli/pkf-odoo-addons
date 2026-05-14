import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./theme/provider";
import Timesheet from "./pages/timesheet";
import "./styles/app.css";

createRoot(document.getElementById("timesheet-app")!).render(
  <StrictMode>
    <AppProvider>
      <Timesheet />
    </AppProvider>
  </StrictMode>,
);
