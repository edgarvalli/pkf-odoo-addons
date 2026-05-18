import { RecibosFilter } from "@/components/recibos/recibos-filter";
import { useRecibosContext } from "@/hooks/use-recibos-context";

export function EmpleadoInfo(props: { label: string; value?: string }) {
  return (
    <div className="d-flex flex-column gap-2">
      <label className="text-muted fw-bold" style={{ fontSize: "10px" }}>
        {props.label}
      </label>
      <span className="text-muted" style={{ fontSize: "12px" }}>
        {props.value}
      </span>
    </div>
  );
}

export function RecibosSidebar() {
  const { empleado } = useRecibosContext();
  return (
    <aside className="h-100 d-flex flex-column p-2">
      <div className="d-flex flex-column gap-2 border-bottom">
        <h6>Información de empleado</h6>
        <EmpleadoInfo label="Codigo Empleado" value={empleado?.codigopostal} />
        <EmpleadoInfo label="Nombre Empleado" value={empleado?.nombre} />
        <EmpleadoInfo label="Departamento" value={empleado?.departamento} />
        <EmpleadoInfo label="Area" value={empleado?.puesto} />
        <EmpleadoInfo
          label="No. Seguro Social"
          value={empleado?.numerosegurosocial}
        />
        <div className="mb-3"></div>
      </div>
      <RecibosFilter />
    </aside>
  );
}
