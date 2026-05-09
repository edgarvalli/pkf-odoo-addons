import { createContext, useContext, useState, type ReactNode } from "react";
import type { TimesheetContext as CtxType } from "./types/context";
import type { Project } from "./types/models";

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
  const [projectId, setProjectId] = useState(0);
  const values: CtxType = { project, setProject, projectId, setProjectId };
  return (
    <TimesheetContext.Provider value={values}>
      {children}
    </TimesheetContext.Provider>
  );
}
