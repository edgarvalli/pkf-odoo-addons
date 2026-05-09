import { useTimesheet } from "../context";

export function TimesheetTaskGrid() {
  const ctx = useTimesheet();
  return (
    <div className="flex-grow-1 p-2">
      <span>Loading..... {ctx.projectId}</span>
    </div>
  );
}
