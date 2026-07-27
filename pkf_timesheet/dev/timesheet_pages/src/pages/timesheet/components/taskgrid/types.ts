import type { Task, TimeEntry } from "@/types/models";

export type EntryRange = {
  project_id: number;
  phase_id: number;
  task_id: number;
  hours: number;
  startdate: string;
  enddate: string;
  note: string;
};

export type TimeEntryCellProps = {
  date: Date;
  task: Task;
  phaseId: number;
  entry: TimeEntry | null;
};
