import { useRecibosContext } from "@/hooks/use-recibos-context";
import { TextField } from "@mui/material";

export function RecibosFilter(props: { onFilter?: () => void }) {
  const { getComprobantes } = useRecibosContext();
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    if (!target) return;

    const fd = new FormData(target);
    const data = Object.fromEntries(fd);
    if (data.startdate > data.enddate) {
      return alert("La fecha inicial no puede ser mayor a la final.");
    }

    await getComprobantes({
      metadata: false,
      ...data,
    });

    props.onFilter?.();
  };
  return (
    <form
      className="mt-2 d-flex flex-column gap-3 flex-grow-1"
      onSubmit={handleSubmit}
    >
      <h6>Filtrar por fechas</h6>
      <TextField
        label="Desde"
        fullWidth
        type="date"
        name="startdate"
        slotProps={{ inputLabel: { shrink: true } }}
        variant="standard"
      />
      <TextField
        label="Hasta"
        fullWidth
        type="date"
        name="enddate"
        slotProps={{ inputLabel: { shrink: true } }}
        variant="standard"
      />
      <button className="btn btn-primary mb-3">
        <i className="fa fa-search"></i>
        <span className="ms-2">Filtrar</span>
      </button>
    </form>
  );
}
