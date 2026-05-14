import type { RangeDate } from "../types/dates";

export const parseDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};
export function getLimitDates(dates: RangeDate[]) {
  const startdate = parseDate(dates[0].date);
  const enddate = parseDate(dates[dates.length - 1].date);
  return {
    startdate,
    enddate,
  };
}

export function getRangeDates(
  startDateStr: string,
  endDateStr: string,
): RangeDate[] {
  const daysLabel = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  // Parseo manual para evitar problemas de zona horaria local
  const [syear, smonth, sday] = startDateStr.split("-").map(Number);
  const [eyear, emonth, eday] = endDateStr.split("-").map(Number);

  // Restamos 1 al mes porque en JS los meses son 0-11
  const current = new Date(syear, smonth - 1, sday);
  const end = new Date(eyear, emonth - 1, eday);

  const rangeDates: RangeDate[] = [];

  // Usamos el valor numérico (timestamp) para comparar fechas de forma segura
  while (current <= end) {
    rangeDates.push({
      // Creamos una nueva instancia para no mutar la misma referencia
      date: new Date(current),
      label: daysLabel[current.getDay()], // .getDay() devuelve 0-6
    });

    // Avanzamos un día
    current.setDate(current.getDate() + 1);
  }

  return rangeDates;
}
