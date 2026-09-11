import { useState, useMemo, useEffect } from "react";
import { buildPeriodDates } from "./builders";
import type { DateNavigationProps, UseCalendarDateResult } from "./types";

export function useDateNavigation(
  props: DateNavigationProps,
): UseCalendarDateResult {
  const [currentDate, setCurrentDate] = useState(
    () => props.currentDate ?? new Date(),
  );

  const backDate = () => {
    setCurrentDate((date) => {
      let newDate: Date;
      switch (props.type) {
        case "weekly":
          newDate = new Date(date);
          newDate.setDate(date.getDate() - 7);
          break;
        case "biweekly":
          newDate = new Date(date);
          newDate.setDate(date.getDate() - 15);
          break;
        default: // monthly
          newDate = new Date(
            date.getFullYear(),
            date.getMonth() - 1,
            date.getDate(),
          );
          break;
      }
      props.onPressBack?.(newDate);
      return newDate;
    });
  };

  const nextDate = () => {
    setCurrentDate((date) => {
      let newDate: Date;
      switch (props.type) {
        case "weekly":
          newDate = new Date(date);
          newDate.setDate(date.getDate() + 7);
          break;
        case "biweekly":
          newDate = new Date(date);
          newDate.setDate(date.getDate() + 15);
          break;
        default: // monthly
          newDate = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
          );
          break;
      }
      props.onPressNext?.(newDate);
      return newDate;
    });
  };

  const goToToday = () => {
    const today = new Date();
    props.onGoToDay?.(today);
    setCurrentDate(today);
  };

  const datesOfPeriod = useMemo(
    () => buildPeriodDates(currentDate, props.type, props.weekComplete),
    [currentDate, props.type, props.weekComplete],
  );

  useEffect(() => {
    props.onBuildDates?.(datesOfPeriod);
  }, [datesOfPeriod]);

  return { currentDate, datesOfPeriod, backDate, nextDate, goToToday };
}
