import type { IProjectRepository } from "@/types/IProjectRepository";
import type { Project } from "../types/models";
import type { IUseOrm } from "../types/orm";
import { parseISODate } from "@/utils/dates";
import { mapProject } from "@/utils/mappers";

export function projectRepository(orm: IUseOrm): IProjectRepository {
  const model = "pkf.timesheet.project";

  const converDateArgs = (startDate: Date, endDate: Date) => {
    return {
      startdate: parseISODate(startDate),
      enddate: parseISODate(endDate),
    };
  };

  const getByUser = async (
    value: string,
    include_phases: boolean = false,
  ): Promise<Project[]> => {
    const method = "search_projects_by_user";
    const args = { value, include_phases };
    const result = await orm.call<any[]>(model, method, [[]], args);
    if (!result) return [];
    return result.map(mapProject);
  };

  const getById = async (
    projectId: number,
    include_phases: boolean,
  ): Promise<Project | null> => {
    const method = "get_by_id";
    const args = { include_phases };
    const result = await orm.call<any>(model, method, [[projectId]], args);
    if (!result) return null;
    return mapProject(result);
  };

  const getProjectByDates = async (
    projectId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<Project | null> => {
    const result = await orm.call<Project | null>(
      model,
      "get_full_data",
      [[projectId]],
      converDateArgs(startDate, endDate),
    );

    if (result) {
      result.period.startDate = new Date(result.period.startDate);
      result.period.endDate = new Date(result.period.endDate);
    }

    return result;
  };
  return { getByUser, getProjectByDates, getById };
}
