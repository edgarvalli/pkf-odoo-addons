import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { TimesheetContext as CtxType } from "@/types/context";
import type { Project } from "@/types/models";
import { useOrm } from "@/hooks/use-orm";
import type { RangeDate } from "@/types/dates";

export const TimesheetContext = createContext<CtxType | null>(null);

export function useTimesheet(): CtxType {
  const ctx = useContext(TimesheetContext);

  // La validación debe ser sobre el resultado de useContext
  if (!ctx) {
    throw new Error("useTimesheet must be used within a TimesheetProvider");
  }

  return ctx;
}

export function TimesheetProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const [rangeDate, setRangeDate] = useState<RangeDate[]>([]);
  const orm = useOrm();
  const values: CtxType = useMemo(
    () => ({
      project,
      setProject,
      orm,
      rangeDate,
      setRangeDate,
    }),
    [project, orm, rangeDate],
  );
  return (
    <TimesheetContext.Provider value={values}>
      {children}
    </TimesheetContext.Provider>
  );
}
