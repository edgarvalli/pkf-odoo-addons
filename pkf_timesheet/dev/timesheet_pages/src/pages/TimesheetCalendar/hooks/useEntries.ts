import { useState } from "react";
import type { TimeEntry } from "@/types/models";
import type { IEntryRepository } from "@/types/IEntryRepository";

export function useEntries(repo: IEntryRepository) {
  const [entries, setEntries] = useState<TimeEntry[]>([]);

  const getEntries = async (currentDate: Date) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const result = await repo.getAllByUser(startDate, endDate);
    setEntries(result ?? []);
  };
  return { entries, getEntries, setEntries };
}
