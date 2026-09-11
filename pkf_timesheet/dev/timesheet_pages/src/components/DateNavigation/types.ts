export type PeriodType = "monthly" | "biweekly" | "weekly";

export interface DateNavigationProps {
  type: PeriodType;
  weekComplete?: boolean;
  currentDate?: Date;
  onPressNext?: (date: Date) => void;
  onPressBack?: (date: Date) => void;
  onGoToDay?: (date: Date) => void;
  onBuildDates?: (dates: Date[]) => void;
}

export interface UseCalendarDateResult {
  currentDate: Date;
  datesOfPeriod: Date[];
  backDate: () => void;
  nextDate: () => void;
  goToToday: () => void;
}
