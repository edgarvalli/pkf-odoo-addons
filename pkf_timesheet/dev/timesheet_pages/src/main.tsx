// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./theme/provider";
import Timesheet from "./pages/timesheet";

// createRoot(document.getElementById("react-app")!).render(
//   <StrictMode>
//     <AppProvider>
//       <Timesheet />
//     </AppProvider>
//   </StrictMode>,
// );

createRoot(document.getElementById("react-app")!).render(
  <AppProvider>
    <Timesheet />
  </AppProvider>,
);
