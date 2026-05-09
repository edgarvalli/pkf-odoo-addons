export function getDateParams(date?: Date) {
  const today = date ?? new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  return { today, year, month, startDate, endDate, title: "Helo" };
}
