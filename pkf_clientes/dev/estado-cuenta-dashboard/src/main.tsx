import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./theme/provider.tsx";
import { routerPaths } from "./Router.ts";
import { RouterProvider } from "react-router";

import "./styles/app.css";

createRoot(document.getElementById("edo-app")!).render(
  <StrictMode>
    <AppProvider className="d-flex flex-grow-1">
      <RouterProvider router={routerPaths} />
    </AppProvider>
  </StrictMode>,
);
