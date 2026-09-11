import { Avatar } from "@/components";
import { isToday } from "../utils";
import { useTimesheetCalendarContext } from "../hooks";

import { type CalendarDay } from "../types";
import "../styles/calendar.cell.css";

export function CalendarCell({
  calendarDay,
  onShowMoreClick,
}: {
  calendarDay: CalendarDay;
  onShowMoreClick?: (item: CalendarDay) => void;
}) {
  const { openEditForm, openForm } = useTimesheetCalendarContext();
  const today = isToday(calendarDay.date);
  const limit = 2;

  const classes = () => {
    const classes = ["calendar-cell"];
    if (!calendarDay.currentMonth) classes.push("calendar-cell--outside");
    if (today) classes.push("calendar-cell--today");
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div
      className={classes()}
      onDoubleClick={() => openForm(true, calendarDay.date)}
    >
      <div className="calendar-cell__header">
        <span className="calendar-cell__day">{calendarDay.day}</span>

        {today && <span className="calendar-cell__today">Hoy</span>}
      </div>

      <div className="calendar-cell__content">
        {calendarDay.entries.slice(0, limit).map((entry) => (
          <div
            className="task"
            role="alert"
            key={entry.id}
            onClick={() => openEditForm(true, entry)}
          >
            <Avatar
              size={18}
              imageB64={entry.project.partner.avatar}
              alt={entry.project.partner.name}
            />
            {entry.task.name.slice(0, 10)}...
          </div>
        ))}

        {calendarDay.entries.length > limit && (
          <div
            className="task justify-content-center"
            role="alert"
            onClick={(e) => {
              e.stopPropagation();
              onShowMoreClick?.(calendarDay);
            }}
          >
            Ver mas
          </div>
        )}
      </div>
    </div>
  );
}
