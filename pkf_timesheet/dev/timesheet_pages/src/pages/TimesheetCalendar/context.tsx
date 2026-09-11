import { createContext, type ReactNode } from "react";
import { useTimesheetCalendar } from "./hooks/useTimesheetCalendar";

export type ITimesheetCalendarContext = ReturnType<typeof useTimesheetCalendar>;

export const TimeSheetCalendarContext =
  createContext<ITimesheetCalendarContext | null>(null);

export function TimesheetCalendarProvider(props: { children: ReactNode }) {
  const ctx = useTimesheetCalendar();

  return (
    <TimeSheetCalendarContext.Provider value={ctx}>
      {props.children}
    </TimeSheetCalendarContext.Provider>
  );
}
