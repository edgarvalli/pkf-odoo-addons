import { DateNavigation, FadeContainer } from "@/components";
import { DashboardTable } from "./DashboardTable";

import "../styles/dashboard.css";
import { useState } from "react";

export function Dashboard() {
  const [rangeOfDates, setRangeOfDates] = useState<Date[]>([]);
  return (
    <FadeContainer className="dashboard-container">
      <div className="dashboard-header">
        <h5 className="mb-0 text-muted">Resumen de horas</h5>
        <DateNavigation type="biweekly" onBuildDates={setRangeOfDates} />
      </div>

      <div className="dashboard-content">
        <DashboardTable periodType="biweekly" rangeOfDate={rangeOfDates} />
      </div>
    </FadeContainer>
  );
}
