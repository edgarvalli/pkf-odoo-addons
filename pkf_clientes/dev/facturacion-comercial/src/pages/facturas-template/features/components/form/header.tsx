import { useOrm } from "@/hooks";
import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

export function DeleteButton() {
  const params = useParams();
  const orm = useOrm();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  if (!params.id) return null;

  const removeRecord = async () => {
    await orm.unlink("pkf.factura.template", [Number(params.id)]);
    navigate(-1);
  };

  return (
    <>
      <button
        className="btn btn-danger"
        onClick={() => dialogRef.current?.showModal()}
      >
        <i className="fa fa-trash me-1"></i>
        Eliminar
      </button>

      <dialog ref={dialogRef}>
        <div className="mb-4">
          <h4>{`¿Deseas eliminar el registro con ID ${params.id}?`}</h4>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-danger me-4"
            onClick={() => dialogRef.current?.close()}
          >
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={removeRecord}>
            Aceptar
          </button>
        </div>
      </dialog>
    </>
  );
}

export function Header() {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <header className="d-flex justify-content-between mt-1">
      <button className="btn btn-link" onClick={() => navigate(-1)}>
        <i className="fa fa-arrow-left me-2" style={{ cursor: "pointer" }}></i>
        {state.title}
      </button>
      <DeleteButton />
    </header>
  );
}
