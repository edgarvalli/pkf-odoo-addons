import { Recibos } from "@/components";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("recibos-app")!).render(
  <StrictMode>
    <Recibos />
  </StrictMode>,
);
