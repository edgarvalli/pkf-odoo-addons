import { Calendar } from "./Calendar";
import { FadeContainer } from "@/components";
import { TimesheetNavbar } from "./TimesheetNavbar";
import { TimesheetCalendarProvider } from "../context";

function TimeSheetCalendarComponent() {
  return (
    <FadeContainer className="d-flex flex-column p-3 h-100">
      <TimesheetNavbar />
      <Calendar className="flex-grow-1" />
    </FadeContainer>
  );
}

export function TimeSheetCalendar() {
  return (
    <TimesheetCalendarProvider>
      <TimeSheetCalendarComponent />
    </TimesheetCalendarProvider>
  );
}
