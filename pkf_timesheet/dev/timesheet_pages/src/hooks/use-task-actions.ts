import { useTimesheet } from "@/context/timesheet";
import type { TimeEntry } from "@/types/models";
import type { EntryRange } from "src/types/entry";

type SaveResponse<T = any> = {
  error: boolean;
  message?: string;
  data?: Record<string, T>;
};

export function useTaskActions() {
  const { setProject, project, orm } = useTimesheet();

  const addEntryToTask = (
    phaseId: number,
    taskId: number,
    newEntry: TimeEntry,
  ) => {
    setProject((prevProject) => {
      if (!prevProject) return null;

      return {
        ...prevProject,
        phases: prevProject.phases.map((phase) => {
          if (phase.id !== phaseId) return phase;

          return {
            ...phase,
            tasks: phase.tasks.map((task) => {
              if (task.id !== taskId) return task;

              // Agregamos la nueva entrada a la tarea específica
              const entryKey = () => {
                if (newEntry.date instanceof Date) {
                  return newEntry.date.toISOString().split("T")[0];
                }
                return newEntry.date;
              };
              return {
                ...task,
                entries: { ...task.entries, [entryKey()]: newEntry },
              };
            }),
          };
        }),
      };
    });
  };

  const saveEntriesToServer = async <T>(): Promise<SaveResponse<T>> => {
    if (!project) {
      return new Promise((resolve) =>
        resolve({ error: true, message: "No esta definido el proyecto." }),
      );
    }
    const entries = project.phases.flatMap((phase) =>
      phase.tasks.flatMap((task) =>
        Object.values(task.entries).filter((entry) => entry.hours > 0),
      ),
    );
    try {
      await orm.call<boolean>("pkf.timesheet.time.entry", "save_bulk", [[]], {
        entries,
        project_id: project.id,
      });

      return {
        error: false,
        message: "ok",
      };
    } catch (err) {
      return {
        error: true,
        message: String(err),
      };
    }
  };

  const saveEntryRange = async (entryRange: EntryRange) => {
    return orm.call("pkf.timesheet.time.entry", "save_range_hours", [[]], {
      entry_dict: entryRange,
    });
  };

  return { addEntryToTask, saveEntriesToServer, saveEntryRange };
}
