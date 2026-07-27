import { Autocomplete, TextField } from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";
import type { EntryRangeProps, EntryRangeRef } from "@/types/entry";
import { ClientCard } from "@/pages/timesheet/components/sidebar/client-card";
import { EVNotification } from "@/widgets/ev-notification";
import { useEntry } from "./use-entry";

export const EntryRangeForm = forwardRef<EntryRangeRef, EntryRangeProps>(
  function (props, ref) {
    const { phase, hidden, hideClient, hidePhase } = props;
    const {
      save,
      getEntry,
      resetForm,
      notification,
      setNotification,
      project,
      formData,
      setFormData,
      handleChange,
    } = useEntry(props);

    useImperativeHandle(ref, () => ({ save, getEntry, resetForm }));

    if (!project || !phase || hidden) return null;

    return (
      <div className="d-flex flex-column gap-3">
        {notification && (
          <EVNotification
            {...notification}
            onClose={() => setNotification(null)}
          />
        )}
        {!hideClient && <ClientCard />}
        {!hidePhase && (
          <TextField
            variant="filled"
            value={phase.name}
            label="Fase Actual"
            disabled
            fullWidth
          />
        )}

        <Autocomplete
          options={phase.tasks}
          getOptionLabel={(o) => o.name ?? ""}
          value={formData.task}
          onChange={(_, val) => setFormData((p) => ({ ...p, task: val }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccionar Tarea"
              variant="standard"
            />
          )}
        />

        <div className="row g-2">
          <div className="col-6">
            <TextField
              fullWidth
              type="date"
              name="start"
              label="Desde"
              variant="standard"
              value={formData.start}
              onChange={handleChange}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              name="end"
              type="date"
              label="Hasta"
              variant="standard"
              value={formData.end}
              onChange={handleChange}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </div>
        </div>

        <TextField
          label="Horas por día"
          type="number"
          variant="standard"
          value={formData.hours}
          name="hours"
          onChange={handleChange}
        />

        <TextField
          label="Comentarios"
          multiline
          rows={2}
          variant="standard"
          value={formData.note}
          name="note"
          onChange={handleChange}
        />
      </div>
    );
  },
);
