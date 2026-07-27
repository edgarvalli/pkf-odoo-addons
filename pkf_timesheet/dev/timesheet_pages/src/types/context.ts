import type { Dispatch, SetStateAction } from "react";
import type { Project } from "./models";
import { useOrm } from "@/hooks/use-orm";
import type { RangeDate } from "./dates";

export interface TimesheetContext {
  project?: Project | null;
  setProject: Dispatch<SetStateAction<Project | null>>;
  orm: ReturnType<typeof useOrm>;
  rangeDate: RangeDate[];
  setRangeDate: Dispatch<SetStateAction<RangeDate[]>>;
  isAllowedDateInProject: (d: Date) => Boolean;
}
