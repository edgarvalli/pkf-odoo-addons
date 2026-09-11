import { parseISODate } from "@/utils/dates";
import type { IUseOrm } from "@/types/orm";
import type { TimeEntryRange } from "@/types/IEntryRepository";
import { mapEntry } from "@/utils/mappers";
import type { TimeEntry } from "@/types/models";
import { mapProject } from "@/utils/mappers";

export function entryRepository(orm: IUseOrm) {
  const model = "pkf.timesheet.time.entry";

  const buildVals = (entry: Partial<TimeEntry>) => {
    const serverKeyMap: Record<string, string> = {
      taskId: "task_id",
      projectId: "project_id",
      phaseId: "phase_id",
      date: "date",
      hours: "hours",
      note: "note",
    };

    return Object.entries(entry).reduce<Record<string, any>>(
      (acc, [key, val]) => {
        if (Object.hasOwn(serverKeyMap, key)) {
          acc[serverKeyMap[key]] = val;
        }

        return acc;
      },
      {},
    );
  };

  const getAllByUser = async (startDate: Date, endDate: Date) => {
    var result = await orm.call<Record<string, any>[] | null>(
      model,
      "get_entries_by_user",
      [[]],
      {
        startdate: parseISODate(startDate),
        enddate: parseISODate(endDate),
      },
    );
    return result ? result.map(mapEntry) : [];
  };

  const saveRange = (entryRange: TimeEntryRange) => {
    const method = "save_range_hours";
    const args = {
      entry_dict: {
        project_id: entryRange.projectId,
        phase_id: entryRange.phaseId,
        task_id: entryRange.taskId,
        hours: entryRange.hours,
        start_date: parseISODate(entryRange.startDate),
        end_date: parseISODate(entryRange.endDate),
      },
    };

    return orm.call<boolean>(model, method, [[]], args);
  };

  const getTotalizeByProject = async (startDate: Date, endDate: Date) => {
    const method = "totalize_by_project";
    const startdate = parseISODate(startDate);
    const enddate = parseISODate(endDate);

    const result = await orm.call<any[]>(model, method, [[]], {
      startdate,
      enddate,
    });
    return result.map(mapProject);
  };

  const update = (entry: Partial<TimeEntry>) => {
    if (!entry.id) return;
    return orm.write(model, [entry.id], buildVals(entry));
  };

  const remove = (entry: Partial<TimeEntry>): Promise<boolean> => {
    if (!entry.id) return Promise.resolve(false);
    return orm.unlink(model, [entry.id]);
  };

  return { getAllByUser, saveRange, update, remove, getTotalizeByProject };
}
