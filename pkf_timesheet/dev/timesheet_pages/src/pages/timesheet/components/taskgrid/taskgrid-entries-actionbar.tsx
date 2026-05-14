import { Autocomplete, TextField } from "@mui/material";
import type { Phase } from "@/types/models";
import { useTimesheet } from "@/context/timesheet";
import { TaskGridEntriesNewEntry } from "./taskgrid-entries-new-entry";

export function TaskGridEntriesActionBar(props: {
  phase: Phase | null;
  onChange?: (phase: Phase | null) => void;
  onSearch?: (value: string) => void;
}) {
  const { phase, onChange, onSearch } = props;

  const ctx = useTimesheet();
  return (
    <div className="box p-2 pt-3 pb-3">
      <div className="row">
        <div className="col-5">
          <Autocomplete
            options={ctx.project?.phases ?? []}
            getOptionKey={(option) => option.id}
            getOptionLabel={(option) => option.name}
            onChange={(_, phase) => onChange?.(phase)}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  variant="standard"
                  label="Selecciona un rubro"
                  fullWidth
                />
              );
            }}
          />
        </div>
        <div className="col-4 d-flex justify-content-center">
          <input
            type="search"
            className={`form-control ${!phase ? "d-none" : ""}`}
            placeholder="Buscar tarea"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
        <div className="col-3 d-flex justify-content-end">
          <TaskGridEntriesNewEntry hidden={!phase} phase={phase} />
        </div>
      </div>
    </div>
  );
}
