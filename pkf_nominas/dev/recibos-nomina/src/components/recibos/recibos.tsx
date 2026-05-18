import { RecibosProvider } from "@/components/recibos/recibos-context";
import { RecibosTable } from "@/components/recibos/recibos-table";
import { RecibosMobile } from "@/components/recibos/recibos-mobile";
import { RecibosSidebar } from "@/components/recibos/recibos-sidebar";
import { useFullHeight } from "@/hooks/use-full-height";
import { useMobileDetection } from "@/hooks/use-mobile-detect";
import { useRecibosContext } from "@/hooks/use-recibos-context";
import { Paper } from "@mui/material";
import { useEffect, useRef } from "react";

export function RecibosComponent() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useFullHeight(containerRef);
  const ctx = useRecibosContext();

  useEffect(() => {
    const metadata: boolean = !ctx.empleado;
    ctx.getComprobantes({ metadata });
  }, []);

  return (
    <div ref={containerRef}>
      <div className="d-flex h-100">
        <Paper style={{ width: "18rem" }}>
          <RecibosSidebar />
        </Paper>
        <div className="container-fluid">
          <RecibosTable />
        </div>
      </div>
    </div>
  );
}

export function RecibosInit() {
  const isMobile = useMobileDetection();
  return isMobile ? <RecibosMobile /> : <RecibosComponent />;
}

export function Recibos() {
  return (
    <RecibosProvider>
      <RecibosInit />
    </RecibosProvider>
  );
}
