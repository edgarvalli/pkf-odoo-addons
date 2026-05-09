import { useCallback, useRef, useState } from "react";
import { getDateParams } from "./utils";
import type { CalendarProps } from "./types";
import "./calendar.css";

export function CalendarField(props: {
  day: number;
  month: number;
  year: number;
  cancelledSelected?: boolean;
  onSelect?: (day: Date) => void;
}) {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    if (!props.cancelledSelected) {
      setSelected((prev) => !prev);
    }
    const date = new Date(props.year, props.month, props.day);
    props.onSelect?.(date);
  };

  return (
    <div
      className={`ev-calendar-field ${selected ? "selected" : ""}`}
      onClick={handleClick}
    >
      <span>{props.day}</span>
    </div>
  );
}

export function Calendar(props: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(
    props.initialDate || new Date(),
  );

  const betweenDate = useRef<Date[]>([]);

  const renderFields = useCallback(() => {
    const params = getDateParams(currentDate);
    return Array.from({ length: params.endDate.getDate() }).map((_, i) => {
      const day = i + 1;
      const month = `0${params.month}`.padEnd(2);
      return (
        <CalendarField
          day={day}
          month={params.month}
          year={params.year}
          key={`${params.year}-${month}-${day}`}
          cancelledSelected={betweenDate.current.length === 2}
          onSelect={(date) => {
            if (betweenDate.current.length < 2) {
              betweenDate.current.push(date);
              setCurrentDate(date);
            } else {
              console.log(betweenDate.current);
            }
          }}
        />
      );
    });
  }, [currentDate]);
  return (
    <div className="ev-calendar">
      <h6>{currentDate.toISOString().split("T")[0]}</h6>
      <div className="ev-calendar-container">{renderFields()}</div>
    </div>
  );
}
