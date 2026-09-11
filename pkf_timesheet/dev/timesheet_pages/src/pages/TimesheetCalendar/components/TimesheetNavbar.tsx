import { TimesheetForm } from "./TimesheetForm";
import { TimesheetEditForm } from "./TimesheetEditForm";
import { DateNavigation } from "@/components";
import { useTimesheetCalendarContext } from "../hooks/useTimesheetCalendarContext";

export function TimesheetNavbar() {
  const { previousMonth, nextMonth, goToToday } = useTimesheetCalendarContext();
  return (
    <nav className="w-100 mx-auto d-flex align-items-center justify-content-between p-2">
      <TimesheetEditForm />
      <TimesheetForm />

      <DateNavigation
        type="monthly"
        onPressBack={() => previousMonth()}
        onPressNext={() => nextMonth()}
        onGoToDay={() => goToToday()}
      />
    </nav>
  );
}
