import { useMemo, useState, type ChangeEvent } from "react";
import type { Task } from "@/types/models";
import { useTimesheet } from "@/context/timesheet";
import { useProject } from "@/hooks/use-project";
import { useTaskActions } from "@/hooks/use-task-actions";
import type { EntryRange, EntryRangeProps } from "@/types/entry";
import { getLimitDates } from "@/utils/dates";
import type { NotificationProps } from "@/widgets/ev-notification/types";

export function useEntry(props: EntryRangeProps) {
  const { phase, onSave } = props;
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
  const [notification, setNotification] = useState<NotificationProps | null>(
    null,
  );
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

  return {
    notification,
    project,
    formData,
    setFormData,
    save,
    getEntry,
    resetForm,
    handleChange,
    setNotification,
  };
}
