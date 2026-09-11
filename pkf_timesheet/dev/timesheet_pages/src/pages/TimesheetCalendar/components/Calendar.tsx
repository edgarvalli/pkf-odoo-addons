import { WEEKDAYS } from "@/data/constants";
import { CalendarCell } from "./CalendarCell";
import { ShowMoreEntry } from "./ShowMoreEntry";
import { useTimesheetCalendarContext } from "../hooks";

import "../styles/calendar.css";

export function Calendar({ className }: { className?: string }) {
  const {
    entries,
    datesOfCalendar,
    isOpenShowMore,
    openEditForm,
    openShowMore,
    handleShowMoreClick,
  } = useTimesheetCalendarContext();

  return (
    <div className={`calendar ${className ? className : ""}`}>
      <div className="calendar__header">
        {WEEKDAYS.map((day) => (
          <div className="calendar__weekday" key={day}>
            {day}
          </div>
        ))}
      </div>

      <div className="calendar__body">
        {datesOfCalendar.map((week, index) => (
          <div className="calendar__week" key={index}>
            {week.map((day) => (
              <CalendarCell
                calendarDay={day}
                key={day.date.toISOString()}
                onShowMoreClick={handleShowMoreClick}
              />
            ))}
          </div>
        ))}
      </div>

      <ShowMoreEntry
        entries={entries}
        onClose={() => openShowMore(false)}
        open={isOpenShowMore}
        onEntrySelect={(entry) => {
          openEditForm(true, entry);
          openShowMore(false);
        }}
      />
    </div>
  );
}
