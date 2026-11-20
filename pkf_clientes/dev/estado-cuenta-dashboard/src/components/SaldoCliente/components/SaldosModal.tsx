import { useEffect } from "react";

import { SaldosHeader } from "./SaldosHeader";
import { SaldoClienteTable } from "./SaldoClienteTable";

import type { SaldosModalProps } from "../types";

export function SaldosModal({
  show,
  onClose,
  headerProps,
  tableProps,
}: SaldosModalProps) {
  useEffect(() => {
    if (!show) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="saldos-modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="saldos-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="saldos-modal-title"
      >
        <div className="saldos-modal-header">
          <div>
            <h5 id="saldos-modal-title" className="mb-1 fw-semibold">
              Estado de cuenta
            </h5>
            <small className="text-secondary">
              Consulta de saldos y facturas de clientes
            </small>
          </div>

          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Cerrar"
          />
        </div>

        <div className="saldos-modal-body">
          <SaldosHeader
            {...headerProps}
            hideTitle={headerProps.hideTitle ?? true}
          />

          <div className="saldos-modal-table">
            <SaldoClienteTable {...tableProps} />
          </div>
        </div>
      </div>
    </div>
  );
}
