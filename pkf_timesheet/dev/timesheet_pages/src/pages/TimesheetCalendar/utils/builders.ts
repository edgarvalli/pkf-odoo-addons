import { type CalendarDay } from "../types";
import { type TimeEntry } from "@/types/models";
import { isSameDay } from "@/utils/dates";

export function buildWeek(
  startDate: Date,
  entries: TimeEntry[],
): CalendarDay[] {
  const week: CalendarDay[] = [];

  const currentPoint = startDate.getDay();

  const sunday = new Date(startDate);
  sunday.setDate(startDate.getDate() - currentPoint);

  for (let i = 0; i < 7; i++) {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);

    week.push({
      date,
      day: date.getDate(),
      currentMonth: true,
      readOnly: false,
      entries: entries.filter((x) => isSameDay(x.date, date)),
    });
  }

  return week;
}

export function buildDaysOfMonth(
  year: number,
  month: number,
  entries: TimeEntry[],
): CalendarDay[][] {
  const rows: CalendarDay[][] = [];

  const firstDay = new Date(year, month, 1);

  let currentDate = new Date(firstDay);

  // Retrocedemos hasta el domingo
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());

  while (true) {
    const week = buildWeek(currentDate, entries);

    rows.push(
      week.map((day) => ({
        ...day,
        currentMonth: day.date.getMonth() === month,
      })),
    );

    // Avanzamos una semana
    currentDate.setDate(currentDate.getDate() + 7);

    // Ya terminamos el mes
    if (currentDate.getMonth() !== month && currentDate.getDay() === 0) {
      break;
    }
  }

  return rows;
}
