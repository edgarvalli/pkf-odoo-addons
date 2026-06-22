import type { FormBaseProps } from "./types";
import { SelectCliente } from "@/widgets";
import { Select } from "../select";

export function FirstRow({ form, metadata }: FormBaseProps) {
  return (
    <div className="row">
      <div className="col d-flex align-items-center">
        <span className="fw-bold me-4">Cliente:</span>
        <SelectCliente
          data={metadata.clientes}
          value={form.data.razonsocial}
          onItemSelected={(c) =>
            form.setData((prev) => ({
              ...prev,
              rfc: c.rfc,
              razonsocial: c.razonSocial,
              idcliente: c.idcliente,
              codigo_cliente: c.codigo,
            }))
          }
        />
      </div>
    </div>
  );
}

export function SecondRow({ form, metadata }: FormBaseProps) {
  return (
    <div className="row">
      <div className="col">
        <label htmlFor="client" className="form-label fw-bold">
          Rfc
        </label>
        <input
          type="text"
          className="form-control"
          readOnly
          disabled
          defaultValue={form.data.rfc}
        />
      </div>
      <Select
        className="col"
        label="Moneda"
        data={metadata.monedas}
        keyExtractor={(item) => item.idmoneda}
        valueKey="idmoneda"
        textKey="nombre"
        value={form.data.idmoneda}
        onSelectChange={(moneda) => {
          form.setData((prev) => ({
            ...prev,
            idmoneda: moneda.idmoneda,
            moneda: moneda.nombre,
          }));
        }}
      />
      <Select
        className="col"
        data={metadata.conceptos}
        keyExtractor={(c) => c.idconcepto}
        valueKey="idconcepto"
        textKey="nombre"
        optionDisabledText="Selecciona un tipo de factura"
        label="Tipo de Factura"
        value={form.data.idconcepto}
        onSelectChange={(c) =>
          form.setData((prev) => ({
            ...prev,
            idconcepto: c.idconcepto,
            concepto: c.nombre,
          }))
        }
      />
    </div>
  );
}

export function Info(props: FormBaseProps) {
  return (
    <>
      <FirstRow {...props} />
      <SecondRow {...props} />
    </>
  );
}
