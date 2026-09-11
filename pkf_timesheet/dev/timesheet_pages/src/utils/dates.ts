export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function parseISODate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function parseDateMX(date: Date) {
  return date.toLocaleDateString("es-MX", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

export function safeDateLocal(date?: string): Date | null {
  if (!date) return null;

  const [datePart, timePart] = date.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);

  const currentDate = new Date(year, month - 1, day);

  if (timePart) {
    const [h, m, s] = timePart.split(":").map(Number);
    currentDate.setHours(h ?? 0, m ?? 0, s ?? 0);
  }

  return currentDate;
}
