import type { TimeEntry } from "@/types/models";

export interface CalendarDay {
  date: Date;
  day: number;
  currentMonth: boolean;
  readOnly: boolean;
  entries: TimeEntry[];
}
