import { useDateNavigation } from "./hooks";
import { formatMonth } from "./utils";
import type { DateNavigationProps } from "./types";

export function DateNavigation(props: DateNavigationProps) {
  const { backDate, goToToday, nextDate, currentDate } =
    useDateNavigation(props);
  return (
    <div className="d-flex align-items-center gap-2">
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={backDate}
        aria-label="Mes anterior"
      >
        &lsaquo;
      </button>

      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={goToToday}
      >
        Hoy
      </button>

      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={nextDate}
        aria-label="Mes siguiente"
      >
        &rsaquo;
      </button>

      <span className="ms-2 fw-semibold text-capitalize">
        {formatMonth(currentDate)}
      </span>
    </div>
  );
}
