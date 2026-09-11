import type { PeriodType } from "./types";

export function buildWeek(currentDate: Date): Date[] {
  const week: Date[] = [];
  const sunday = new Date(currentDate);
  sunday.setDate(currentDate.getDate() - currentDate.getDay());

  for (let i = 0; i < 7; i++) {
    week.push(
      new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + i),
    );
  }
  return week;
}

export function buildMonthlyComplete(date: Date): Date[] {
  const rows: Date[] = [];
  const year = date.getFullYear();
  const month = date.getMonth();

  let currentDate = new Date(year, month, 1);
  currentDate.setDate(currentDate.getDate() - currentDate.getDay()); // retrocedemos al domingo

  while (true) {
    rows.push(...buildWeek(currentDate));
    currentDate.setDate(currentDate.getDate() + 7);

    if (currentDate.getMonth() !== month && currentDate.getDay() === 0) break;
  }
  return rows;
}

export function buildBiWeekly(currentDate: Date): Date[] {
  const rows: Date[] = [];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const isFirstHalf = currentDate.getDate() <= 15;
  const startDay = isFirstHalf ? 1 : 16;
  const endDay = isFirstHalf ? 15 : new Date(year, month + 1, 0).getDate();

  for (let d = startDay; d <= endDay; d++) {
    rows.push(new Date(year, month, d));
  }
  return rows;
}

export function buildMonthly(currentDate: Date): Date[] {
  const rows: Date[] = [];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    rows.push(new Date(year, month, d));
  }
  return rows;
}

export function buildPeriodDates(
  currentDate: Date,
  type: PeriodType = "monthly",
  weekComplete = false,
): Date[] {
  switch (type) {
    case "weekly":
      return buildWeek(currentDate);
    case "biweekly":
      return buildBiWeekly(currentDate);
    default:
      return weekComplete
        ? buildMonthly(currentDate)
        : buildMonthlyComplete(currentDate);
  }
}

export function buildPeriodWeeks(
  currentDate: Date,
  type: PeriodType = "monthly",
): Date[][] {
  const dates = buildPeriodDates(currentDate, type, true);
  const weeks: Date[][] = [];

  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return weeks;
}
