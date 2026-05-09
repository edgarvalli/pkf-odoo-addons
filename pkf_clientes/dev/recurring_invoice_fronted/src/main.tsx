import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./router.js";

import "./scss/main.scss";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);
