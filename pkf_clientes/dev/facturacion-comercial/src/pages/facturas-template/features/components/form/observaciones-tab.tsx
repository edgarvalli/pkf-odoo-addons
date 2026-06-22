import { renderTemplate } from "@/pages/facturas-template/features/components/form/utils";
import type { FormBaseProps } from "./types";
import { observacionesValues } from "./constants";
import { useMemo } from "react";
import type { FacturaTemplate } from "@/pages/facturas-template/features/types/models";

function useObservaciones(form: FormHook<FacturaTemplate>) {
  const txtId = "observaciones_template";
  const refId = "referencia";

  const addVarToDescripcion = (key: string) => {
    form.setData((prev) => ({
      ...prev,
      observaciones_template: [prev.observaciones_template, `{{${key}}}`].join(
        " ",
      ),
    }));
  };

  const obserVars = useMemo(() => observacionesValues(form.data), [form.data]);
  const preview = renderTemplate(form.data);

  return { txtId, refId, addVarToDescripcion, obserVars, preview };
}

export function ObservacionesTab({ form }: FormBaseProps) {
  const { txtId, refId, addVarToDescripcion, obserVars, preview } =
    useObservaciones(form);

  return (
    <div className="d-flex flex-column flex-grow-1 m-h-1 mt-3">
      <div className="row h-100 overflow-y-auto mb-3">
        <div className="col-12 col-sm-4">
          <label htmlFor={refId} className="form-label fw-bold">
            Referencia
          </label>
          <input
            type="text"
            id={refId}
            name={refId}
            className="form-control"
            value={form.data.referencia ?? ""}
            onChange={form.handleChange}
          />
        </div>
        <div className="col">
          <div className="fw-bold p-2">Variables</div>
          <ul className="list-group list-group-horizontal">
            {Object.keys(obserVars).map((key) => (
              <li
                key={key}
                className="list-group-item ev-var__option"
                onClick={() => addVarToDescripcion(key)}
              >
                {key}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-12">
          <label htmlFor={txtId} className="form-label fw-bold">
            Descripcion
          </label>
          <textarea
            name={txtId}
            id={txtId}
            className="form-control"
            onChange={form.handleChange}
            value={form.data.observaciones_template}
          ></textarea>
        </div>
        <div className="col-12 mt-2">
          <label htmlFor={txtId} className="form-label fw-bold">
            Preview
          </label>
          <div>
            <span className="text-muted" style={{ whiteSpace: "pre-wrap" }}>
              {preview}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
