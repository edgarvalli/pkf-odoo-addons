import type { FormBaseProps } from "./types";

export function PaymentTab({ form }: FormBaseProps) {
  return (
    <div className="row mt-3 gap-3">
      <div className="col-12 col-sm-3">
        <label htmlFor="pago" className="form-label fw-bold">
          Pago Actual
        </label>
        <input
          type="number"
          name="pago"
          id="pago"
          value={form.data.pago}
          onChange={form.handleChange}
          className="form-control"
        />
      </div>
      <div className="col-12 col-sm-3">
        <label htmlFor="total_pagos" className="form-label fw-bold">
          Pagos Totales
        </label>
        <input
          type="number"
          name="total_pagos"
          id="total_pagos"
          value={form.data.total_pagos}
          onChange={form.handleChange}
          className="form-control"
        />
      </div>
    </div>
  );
}
