import { useForm, useOrm } from "@/hooks";
import { useSignalR } from "@/providers/signalr";
import { SignalRStatus } from "@/widgets";
import type { StatusType } from "@/widgets/signalr-status/signalr-status";
import { useEffect, useRef, useState } from "react";

export function ButtonProcesar() {
  const orm = useOrm();
  const form = useForm<Record<string, any>>();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { socket } = useSignalR();
  const [buttonText, setButtonText] = useState("Procesar");

  const confirmProcess = async () => {
    if (!form.data["cert_password"])
      return alert("Debes de ingresar el password.");
    const success = await orm.call<{ error: boolean; message: string }>(
      "pkf.factura.template",
      "process_template",
      [[form.data.cert_password]],
      form.data,
    );
    if (success.error) return window.toast(success.message, "warning");
    window.toast("Proceso iniciado", "success");
    dialogRef.current?.close();
  };

  useEffect(() => {
    socket?.on("notify", (status: StatusType, _) => {
      if (status === "processing") {
        setButtonText("Procesando.......");
      } else {
        setButtonText("Procesar");
      }
    });

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dialogRef.current?.close();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [socket]);
  return (
    <div>
      <SignalRStatus />
      <button
        className="btn btn-outline-primary ms-2"
        onClick={() => dialogRef.current?.showModal()}
        disabled={buttonText !== "Procesar"}
      >
        <i className="fa fa-bullseye me-1"></i>
        {buttonText}
      </button>
      <dialog ref={dialogRef}>
        <div className="container">
          <div className="row">
            <div className="col">
              <label htmlFor="cert_password" className="form-label fw-bold">
                Contraseña del Certificado
              </label>
              <input
                type="password"
                name="cert_password"
                id="cert_password"
                className="form-control"
                placeholder="********"
                value={form.data.cert_password}
                onChange={form.handleChange}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button className="btn btn-primary" onClick={confirmProcess}>
                Procesar
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
