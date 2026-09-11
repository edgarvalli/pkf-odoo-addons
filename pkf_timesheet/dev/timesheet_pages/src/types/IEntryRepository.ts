import type { TimeEntry } from "./models";
export interface IEntryRepository {
  getAllByUser(startDate: Date, endDate: Date): Promise<TimeEntry[] | null>;
  saveRange(entries: TimeEntryRange): Promise<boolean>;
  update(entry: Partial<TimeEntry>): Promise<boolean> | undefined;
  remove(entry: Partial<TimeEntry>): Promise<boolean>;
}

export interface TimeEntryRange {
  projectId: number;
  phaseId: number;
  taskId: number;
  hours: number;
  note: string;
  startDate: Date;
  endDate: Date;
  isNotCargable?: boolean;
}

export interface TimeEntryValue {
  id?: number;
  date: Date;
  employeeId?: number;
  hours: number;
  note: string;
  taskId: number;
  phaseId: number;
  projectId: number;
}
