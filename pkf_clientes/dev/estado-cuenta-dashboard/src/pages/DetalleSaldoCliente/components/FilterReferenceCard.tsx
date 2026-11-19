import { useEffect, useId, useRef, useState } from "react";

export function FilterReferenceCard(props: {
  references: string[];
  onChange?: (value: string) => void;
}) {
  const [show, setShow] = useState(false);
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  return (
    <div ref={containerRef} className="d-inline-block position-relative">
      <i
        className="fa fa-filter"
        style={{ cursor: "pointer" }}
        onClick={() => setShow((prev) => !prev)}
      />

      <div className={`ev-filter-card ${show ? "" : "hide"}`}>
        <label htmlFor={`filter-ref-${id}`} className="form-label">
          Selecciona una referencia
        </label>

        <select
          name="ev-filter-ref"
          id={`filter-ref-${id}`}
          className="form-control"
          defaultValue="ALL"
          onChange={(e) => {
            setShow(false);
            props.onChange?.(e.target.value);
          }}
        >
          <option value="ALL">TODAS</option>

          {props.references.map((r) => (
            <option value={r} key={`${r}_${id}`}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
