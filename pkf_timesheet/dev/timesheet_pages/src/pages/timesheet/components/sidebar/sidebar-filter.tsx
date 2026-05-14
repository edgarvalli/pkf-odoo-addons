import { TextField } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import { useProject } from "@/hooks/use-project";

type RangeDate = {
  startdate: string;
  enddate: string;
};
export function SidebarFilter(props: { projectId: number | null }) {
  const [rangeDates, setRangeDates] = useState<RangeDate>({
    startdate: "",
    enddate: "",
  });

  const { getProject } = useProject();

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setRangeDates((prev) => ({ ...prev, [name as keyof RangeDate]: value }));
  };
  const handleFetchProjects = async () => {
    if (!props.projectId) return;
    const { startdate, enddate } = rangeDates;
    await getProject(props.projectId, startdate, enddate);
  };
  return (
    <div className="row">
      <div className="col col-lg-12 mb-3">
        <TextField
          variant="standard"
          id="startdate"
          fullWidth
          type="date"
          label="Desde"
          slotProps={{ inputLabel: { shrink: true } }}
          name="startdate"
          onChange={handleChange}
        />
      </div>
      <div className="col col-lg-12 mb-3">
        <TextField
          variant="standard"
          type="date"
          className="form-control"
          id="enddate"
          label="Hasta"
          slotProps={{ inputLabel: { shrink: true } }}
          name="enddate"
          onChange={handleChange}
        />
      </div>
      <div className="col">
        <button
          className="btn btn-outline-primary"
          onClick={handleFetchProjects}
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}
