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
