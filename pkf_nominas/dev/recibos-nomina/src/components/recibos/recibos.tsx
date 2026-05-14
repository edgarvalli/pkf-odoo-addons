import { RecibosSidebar } from "@/components/recibos/recibos-sidebar";
import { useFullHeight } from "@/hooks/use-full-height";
import { useRef } from "react";

export function Recibos() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useFullHeight(containerRef);
  return (
    <div ref={containerRef}>
      <div className="d-flex h-100">
        <div className="sidebar">
          <RecibosSidebar />
        </div>
      </div>
    </div>
  );
}
