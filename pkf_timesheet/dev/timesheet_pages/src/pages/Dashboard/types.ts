import type { Project } from "@/types/models";
import type { PeriodType } from "@/types/dates";

export interface DashboardTRowsProps {
  projects: Project[];
  days: Date[];
  cellSize: number;
  isEmpty: boolean;
  totalValueInDate?: (date: Date) => string | number;
  totalizeByDate?: (date: Date) => string | number;
  findValueInDateNoCost?: (date: Date) => string | number;
  findValueInDate?: (projectId: number, date: Date) => string | number;
}

export interface DashboardTableProps {
  periodType: PeriodType;
  rangeOfDate?: Date[];
  onSumHours?: (hours: number) => void;
}
