import { useMemo } from "react";
import { formatNumber } from "./utils";
import { VoidRows } from "./void-rows";
import { MovesTBody } from "./moves-tbody";
import { AddProducto } from "@/widgets/add-producto";

import type { FormBaseProps } from "./types";
import type { FacturaTemplate } from "@/pages/facturas-template/features/types/models";

function useMoves(form: FormHook<FacturaTemplate>) {
  const calcTotal = useMemo(() => {
    const neto = form.data.movimientos?.reduce((aco, mov) => {
      return aco + Number((mov.unidades ?? 1) * (mov.precio ?? 0));
    }, 0);

    return formatNumber(neto ?? 0);
  }, [form.data.movimientos]);

  const addNewProduct = (prod: Producto) => {
    form.setData((prev) => ({
      ...prev,
      movimientos: [
        ...(prev.movimientos ?? []),
        {
          idcomercial: 0,
          idproducto: prod.idproducto,
          unidades: 1,
          precio: prod.precio,
          segmento: "",
          neto: prod.precio,
          codigo_producto: prod.codigo,
          producto: prod.nombre,
        },
      ],
    }));
  };

  return { calcTotal, addNewProduct };
}

export function Moves({ form, metadata }: FormBaseProps) {
  const { addNewProduct, calcTotal } = useMoves(form);

  return (
    <div className="d-flex flex-column flex-grow-1 min-h">
      <div className="row mb-2">
        <div className="col col-sm-9"></div>
        <div className="col text-end">
          <AddProducto data={metadata.productos} onAdd={addNewProduct} />
        </div>
      </div>
      <div className="row d-flex flex-column flex-grow-1 min-h">
        <div className="col d-flex flex-column flex-grow-1 min-h scrollbar-thin overflow-y-auto">
          <table className="table">
            <thead
              className="sticky-top z-3"
              style={{ backgroundColor: "#eee" }}
            >
              <tr>
                <th>Codigo</th>
                <th>Producto</th>
                <th style={{ width: 100 }}>Unidades</th>
                <th style={{ width: 150 }}>Precio</th>
                <th style={{ width: 100 }}>Segmento</th>
                <th style={{ width: 150 }}>Subtotal</th>
                <th>
                  <i className="fas fa-ellipsis-v"></i>
                </th>
              </tr>
            </thead>
            {(form.data.movimientos ?? []).length === 0 && <VoidRows />}
            {(form.data.movimientos ?? []).length !== 0 && (
              <MovesTBody form={form} metadata={metadata} />
            )}
          </table>
        </div>
      </div>
      <div className="row p-2">
        <div className="col col-sm-8"></div>
        <div className="col text-end">
          <h3 className="fw-bold text-primary">{"Subtotal $ " + calcTotal}</h3>
        </div>
      </div>
    </div>
  );
}
