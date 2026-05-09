import type { Dispatch, SetStateAction } from "react";
import type { Project } from "./models";

export interface TimesheetContext {
  project?: Project | null;
  setProject: Dispatch<SetStateAction<Project | null>>;
  projectId: number;
  setProjectId: Dispatch<SetStateAction<number>>;
}
