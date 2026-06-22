import { Loader } from "@/widgets/loader";
import type { FormBaseProps } from "./types";
import { useOrm } from "@/hooks/use-orm";
import { useParams } from "react-router";

export function Footer({ form }: FormBaseProps) {
  const orm = useOrm();
  const { id } = useParams();

  const handleSubmit = async () => {
    if (!form.data.idcliente) {
      return window.toast("Debes de definir un cliente.", "warning");
    }

    if (!form.data.idmoneda) {
      return window.toast("Debes de definir un tipo de moneda", "warning");
    }

    if (!form.data.idconcepto) {
      return window.toast("Debes definir un tipo de factura", "warning");
    }

    if (!form.data.movimientos?.length) {
      return window.toast("Debes agregar al menos un movimiento", "warning");
    }

    if (!form.data.observaciones_template) {
      return window.toast("Debes de agregar una observacion", "warning");
    }

    const { total, movimientos = [], ...rest } = form.data;

    const payload = {
      ...rest,
      movimientos: movimientos.map(({ neto, ...mov }) => ({
        ...mov,
      })),
    };

    try {
      // CREATE
      if (!id) {
        const newId = await orm.call<number>(
          "pkf.factura.template",
          "create_template",
          [payload],
        );

        if (!newId) {
          return window.toast("No se creo correctamente", "error");
        }

        form.setData((prev) => ({
          ...prev,
          id: newId,
        }));

        return window.toast("Se creó correctamente", "success");
      }

      // UPDATE (futuro listo)
      await orm.call("pkf.factura.template", "write_template", [Number(id)], {
        vals: payload,
      });

      return window.toast("Se actualizó correctamente", "success");
    } catch (error: any) {
      console.error(error);
      return window.toast(error?.message || "Error en la operación", "error");
    }
  };

  return (
    <footer className="p-4 pt-2 d-flex justify-content-end w-100">
      <Loader message="Guardando datos" show={orm.fetching} />

      <button className="btn btn-primary" onClick={handleSubmit}>
        <i className="fa fa-floppy-disk me-2"></i>
        {form.data.id ? "Actualizar" : "Guardar"}
      </button>
    </footer>
  );
}
