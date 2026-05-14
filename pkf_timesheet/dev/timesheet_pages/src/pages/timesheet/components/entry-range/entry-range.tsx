import { useRef, useState } from "react";
import { useTimesheet } from "@/context/timesheet";
import { SearchProject } from "../../components/sidebar/search-project";
import { useProject } from "@/hooks/use-project";
import { ClientCard } from "@/pages/timesheet/components/sidebar/client-card";
import { Autocomplete, TextField } from "@mui/material";
import type { Phase } from "@/types/models";
import { EntryRangeForm } from "./entry-range-form";
import { EVLoader } from "@/widgets/ev-loader";
import type { EntryRangeRef } from "src/types/entry";

export function EntryRangeUI(props: { className?: string }) {
  const { project, orm } = useTimesheet();
  const { getProject } = useProject();
  const [phase, setPhase] = useState<Phase | null>(null);
  const formRef = useRef<EntryRangeRef | null>(null);
  return (
    <div className={`container ${props.className}`}>
      <EVLoader
        message="Guardando datos del proyecto."
        hidden={!orm.fetching}
      />
      <div className="row g-3">
        <div className="col-12 mt-4 text-center">
          <h6>Control de Tiempos</h6>
        </div>
        <div className="col-12">
          <ClientCard />
        </div>
        <div className="col-12">
          <SearchProject
            onItemSelected={(projectId) => getProject(projectId, "", "")}
          />
        </div>
        <div className={`col-12 ${project ? "" : "d-none"}`}>
          <Autocomplete
            options={project?.phases ?? []}
            getOptionKey={(option) => option.id}
            getOptionLabel={(option) => option.name}
            onChange={(_, phase) => setPhase(phase)}
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
        <div className="col-12">
          <EntryRangeForm phase={phase} hideClient hidePhase ref={formRef} />
        </div>
        <div className={`col-12 ${project ? "" : "d-none"}`}>
          <button
            className="btn btn-primary w-100"
            onClick={() => formRef.current?.save()}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
