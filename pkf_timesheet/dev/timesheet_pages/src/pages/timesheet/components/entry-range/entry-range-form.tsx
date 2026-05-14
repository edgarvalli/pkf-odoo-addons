import { Autocomplete, TextField } from "@mui/material";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import type { Task } from "@/types/models";
import type { EntryRange, EntryRangeProps, EntryRangeRef } from "@/types/entry";
import { useTimesheet } from "@/context/timesheet";
import type { NotificationProps } from "@/widgets/ev-notification/types";
import { getLimitDates } from "@/utils/dates";
import { useProject } from "@/hooks/use-project";
import { ClientCard } from "@/pages/timesheet/components/sidebar/client-card";
import { EVNotification } from "@/widgets/ev-notification";
import { useTaskActions } from "@/hooks/use-task-actions";

export const EntryRangeForm = forwardRef<EntryRangeRef, EntryRangeProps>(
  function (props, ref) {
    const { phase, hidden, onSave, hideClient, hidePhase } = props;
    const [notification, setNotification] = useState<NotificationProps | null>(
      null,
    );

    const initData = useMemo(
      () => ({
        task: null as Task | null,
        start: "",
        end: "",
        hours: "",
        note: "",
      }),
      [],
    );
    const [formData, setFormData] = useState(initData);

    const { project, rangeDate } = useTimesheet();
    const { getProject } = useProject();
    const { saveEntryRange } = useTaskActions();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const getEntry = (): EntryRange | null => {
      const { task, start, end, hours, note } = formData;
      if (!task || !start || !end || !hours || !project || !phase) {
        return null;
      }
      return {
        project_id: project.id,
        phase_id: phase.id,
        task_id: task.id,
        hours: Number(hours),
        startdate: start,
        enddate: end,
        note,
      };
    };

    const save = async () => {
      if (!project) return;
      const entry_dict = getEntry();

      if (!entry_dict) {
        setNotification({
          message: "Por favor completa todos los campos",
          color: "warning",
          delay: 2000,
        });
        return;
      }

      try {
        const ok = await saveEntryRange(entry_dict);

        if (ok) {
          setNotification({
            message: "Se guardó correctamente",
            color: "success",
            delay: 3000,
          });

          let start = "";
          let end = "";
          console.log(rangeDate);
          if (rangeDate.length > 0) {
            const { startdate, enddate } = getLimitDates(rangeDate);
            start = startdate;
            end = enddate;
          }
          await getProject(project.id, start, end);
        }
      } catch (err) {
        setNotification({
          message: String(err),
          color: "error",
          delay: 3000,
        });
      } finally {
        onSave?.(entry_dict);
        // resetForm();
      }
    };

    const resetForm = () => {
      setFormData(initData);
    };

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
