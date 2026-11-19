import type { FilterReferenceCardProps } from "../types";
import { useFilterReference } from "../hooks/useFilterReference";
export function FilterReferenceCard(props: FilterReferenceCardProps) {
  const {
    containerRef,
    id,
    show,
    clearAll,
    selectAll,
    setShow,
    toggleReference,
    referenceExists,
  } = useFilterReference(props);

  return (
    <div ref={containerRef} className="d-inline-block position-relative">
      <i
        className="fa fa-filter"
        style={{ cursor: "pointer" }}
        onClick={() => setShow((prev) => !prev)}
      />

      {show && (
        <div className="filter-card">
          <div className="d-flex mb-2 justify-content-between align-items-center">
            <label className="mb-0 form-label">Selecciona referencias</label>

            <button
              type="button"
              className="p-0 btn btn-sm btn-link"
              onClick={clearAll}
            >
              Limpiar
            </button>
          </div>

          <div className="d-flex mb-2 justify-content-between">
            <small>{props.value?.length} seleccionadas</small>

            <button
              type="button"
              className="p-0 btn btn-sm btn-link"
              onClick={selectAll}
            >
              Seleccionar todas
            </button>
          </div>

          <div className="filter-reference-list">
            {props.references.map((reference, index) => {
              const inputId = `${id}-${index}`;

              return (
                <div className="form-check" key={reference}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={inputId}
                    checked={referenceExists(reference)}
                    onChange={() => toggleReference(reference)}
                  />

                  <label className="form-check-label" htmlFor={inputId}>
                    {reference}
                  </label>
                </div>
              );
            })}
          </div>

          <div className="d-flex mt-3 justify-content-end">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setShow(false)}
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
