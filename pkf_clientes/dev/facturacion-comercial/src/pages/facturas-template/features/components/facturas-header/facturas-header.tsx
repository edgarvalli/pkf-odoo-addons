import { useRef } from "react";
import { useImportExcel } from "@/pages/facturas-template/features/hooks";
import { useNavigate } from "react-router";
import { ButtonProcesar } from "./facturas-button-procesar";

export function FacturasHeader() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { handleImportChange, importing } = useImportExcel();

  return (
    <header className="p-2 d-flex gap-3">
      <div className="d-flex flex-grow-1 align-items-center gap-4">
        <ButtonProcesar />
      </div>
      <div>
        <button
          className="btn btn-link btn-primary"
          onClick={() => fileRef.current?.click()}
          disabled={importing}
        >
          <i className="fa fa-upload me-2"></i>
          {importing ? "Importando template" : "Subir template"}
        </button>
        <input
          type="file"
          accept=".csv,.xlsx,.xlx"
          ref={fileRef}
          onChange={() => handleImportChange(fileRef)}
          className="d-none"
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={() =>
          navigate("/factura-template/form", {
            state: { title: "Template Nuevo" },
          })
        }
      >
        <i className="fa fa-plus"></i>
        Nuevo
      </button>
    </header>
  );
}
