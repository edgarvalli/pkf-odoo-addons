import type { Project } from "./models";

export interface IProjectRepository {
  getByUser(value?: string, includePhases?: boolean): Promise<Project[]>;
  getById(projectId: number, includePhases?: boolean): Promise<Project | null>;
  getProjectByDates(
    projectId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<Project | null>;
}
