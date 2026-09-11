import type { PeriodType } from "./types";
export function formatMonth(date: Date) {
  return new Intl.DateTimeFormat("es-MX", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatTitle(date: Date, type: PeriodType = "monthly") {
  if (type === "biweekly") return "Qincenal";

  if (type === "weekly") return "Semanal";

  return formatMonth(date);
}
