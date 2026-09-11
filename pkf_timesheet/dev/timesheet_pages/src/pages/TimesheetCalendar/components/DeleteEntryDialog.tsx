import { useState } from "react";
import { EVModal } from "@/components";
import type { TimeEntry } from "@/types/models";

export function DeleteEntryDialog(props: {
  onAccept?: () => void;
  entry: TimeEntry;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="btn btn-danger d-flex justify-content-between align-items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <i className="fa fa-trash" aria-hidden="true"></i>
        Eliminar
      </button>
      <EVModal open={open} heightCard={180}>
        <EVModal.Body className="d-flex justify-content-center align-items-center">
          <h5 className="text-center">
            ¿Deseas elminar el registro {props.entry.task.name}?
          </h5>
        </EVModal.Body>
        <EVModal.Footer>
          <button
            className="btn btn-primary"
            onClick={() => {
              setOpen(false);
              props.onAccept?.();
            }}
          >
            <i className="fa fa-bullseye"></i>
            Aceptar
          </button>
          <button className="btn text-danger" onClick={() => setOpen(false)}>
            Cancelar
          </button>
        </EVModal.Footer>
      </EVModal>
    </>
  );
}
