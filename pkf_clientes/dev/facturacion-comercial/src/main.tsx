import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "@/pages";
import "./tools";
import "./styles/app.css";
import { AppProvider, SignalRProvider } from "@/providers";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <SignalRProvider>
        <RouterProvider router={router} />
      </SignalRProvider>
    </AppProvider>
  </StrictMode>,
);
