import { useContext } from "react";
import { TimeSheetCalendarContext } from "../context";

export function useTimesheetCalendarContext() {
  const ctx = useContext(TimeSheetCalendarContext);

  if (!ctx)
    throw new Error(
      "The useTimesheetCalendarContext must be inside of proveider",
    );

  return ctx;
}
