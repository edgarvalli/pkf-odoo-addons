import type { TimeEntry } from "@/types/models";
export function isAllowedToDo(entry: TimeEntry) {
  if (entry.project.isNotCargable) return true;
  const { open, startDate, endDate } = entry.project.period;
  if (open) return true;

  return entry.date >= startDate && entry.date <= endDate;
}
