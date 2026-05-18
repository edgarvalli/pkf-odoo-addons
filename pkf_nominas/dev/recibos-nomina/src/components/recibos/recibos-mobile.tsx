import { RecibosActions } from "@/components/recibos/recibos-actions";
import { RecibosMobileNavbar } from "@/components/recibos/recibos-mobile-navbar";
import { useFullHeight } from "@/hooks/use-full-height";
import { useRecibosContext } from "@/hooks/use-recibos-context";
import { Skeleton } from "@mui/material";
import { useRef } from "react";

export function RecibosMobile() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const height = useFullHeight(containerRef);
  const { comprobantes, loading } = useRecibosContext();

  const renderCardSkeleton = Array.from({ length: 10 }).map((_, i) => {
    return (
      <div className="border-bottom mb-3" key={i}>
        <h6>
          <Skeleton variant="rectangular" />
        </h6>
        <div className="d-flex">
          <span className="w-25">
            <Skeleton variant="text" />
          </span>
          <span className="w-75">
            <div className="w-100 d-flex justify-content-end">
              <Skeleton variant="text" sx={{ width: 200 }} />
            </div>
          </span>
        </div>
        <div className="d-flex justify-content-between mt-3 mb-3">
          <button className="btn btn-light w-25">
            <Skeleton />
          </button>
          <button className="btn btn-btn-outline-primary w-25">
            <Skeleton />
          </button>
        </div>
      </div>
    );
  });

  const renderCards = comprobantes.map((c) => {
    return (
      <div className="border-bottom p-3" key={c.iddocumento}>
        <div className="fw-bold" style={{ fontSize: 14 }}>
          {c.nombreemisor}
        </div>
        <span className="text-muted" style={{ fontSize: 10 }}>
          {c.rfcemisor}
        </span>

        <div>
          <span style={{ fontSize: 12 }} className="text-muted fw-bold">
            UUID:
          </span>
          <span className="ms-3 text-muted" style={{ fontSize: 10 }}>
            {c.uuid}
          </span>
        </div>
        <div className="d-flex  justify-content-between mt-3">
          <span style={{ fontSize: 12 }} className="fw-bold">
            Total:
          </span>
          <span>
            {Number(c.total).toLocaleString("es-MX", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="text-end mt-3">
          <RecibosActions iddocumento={c.iddocumento} />
        </div>
      </div>
    );
  });

  return (
    <div
      className="container-fluid"
      ref={containerRef}
      style={{ height, overflowY: "auto", scrollbarWidth: "thin" }}
    >
      <div className="row">
        <div className="col">
          <RecibosMobileNavbar />
        </div>
      </div>
      <div className="row">
        <div className="col">{loading ? renderCardSkeleton : renderCards}</div>
      </div>
    </div>
  );
}
