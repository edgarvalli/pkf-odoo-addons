import { useFullHeight } from "@/hooks/use-full-height";
import { useOrm } from "@/hooks/use-orm";
import { useRef } from "react";

export function Recibos() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useFullHeight(containerRef);
  const orm = useOrm();
  const handleClick = async () => {
    await orm.call("pkf.clientes.taskscheduler", "run_send_invoices", [[]]);
  };
  return (
    <div ref={containerRef}>
      <div className="d-flex">
        <button className="btn btn-primary" onClick={handleClick}>
          Test
        </button>
      </div>
    </div>
  );
}
