import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./theme/provider.tsx";
import { Router } from "./Router.tsx";

import "./styles/app.css";

createRoot(document.getElementById("edo-app")!).render(
  <StrictMode>
    <AppProvider className="d-flex flex-grow-1">
      <Router />
    </AppProvider>
  </StrictMode>,
);
