import { useEffect } from "react";
import type { ButtonSelectModalProps } from "./types";

export function ButtonSelectModal<T>(props: ButtonSelectModalProps<T>) {
  const handleClose = () => {
    props.onClose?.();
    props.setOpen(false);
  };

  const handleOnItemSelected = (item: T) => {
    props.onItemSelected?.(item);
    handleClose();
  };
  const renderHeaders = props.headers.map((h) => (
    <th key={h.name}>{h.text ?? String(h.name)}</th>
  ));

  const renderCells = (item: T) => {
    return (
      <tr
        onClick={() => handleOnItemSelected(item)}
        key={props.keyExtractor(item)}
      >
        {props.headers.map((h, i) => (
          <td key={`cell-${h.name}-${i}}`}>
            {h.render ? h.render(item) : String(item[h.name])}
          </td>
        ))}
      </tr>
    );
  };

  const renderRows = props.data.map(renderCells);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && props.open) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <div className={`bs-modal ${props.open ? "open" : ""}`}>
      <div className="bs-modal__sheet">
        <header className="d-flex flex-column gap-3">
          <div className="d-flex justify-align-content-between">
            <h6 className="flex-grow-1">{props.title}</h6>
            <i
              className="fa fa-close"
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            ></i>
          </div>
          <input
            {...props.slots?.inputProps}
            onChange={props.onSearch}
            className="form-control"
          />
        </header>
        <div className="bs-modal__table">
          <table>
            <thead>
              <tr>{renderHeaders}</tr>
            </thead>
            <tbody>{renderRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
