import { useEffect, useMemo, useState } from "react";
import { buildDaysOfMonth } from "../utils/builders";
import type { TimeEntry } from "@/types/models";

export function useCalendarDate(
  entries: TimeEntry[],
  getEntries: (date: Date) => void,
) {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // Methods
  const previousMonth = () => {
    setCurrentDate((date) => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() - 1);

      return newDate;
    });
  };

  const nextMonth = () => {
    setCurrentDate((date) => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + 1);

      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const datesOfCalendar = useMemo(
    () =>
      buildDaysOfMonth(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        entries,
      ),
    [currentDate, entries],
  );

  useEffect(() => {
    getEntries(currentDate);
  }, [currentDate]);

  return { currentDate, datesOfCalendar, previousMonth, nextMonth, goToToday };
}
