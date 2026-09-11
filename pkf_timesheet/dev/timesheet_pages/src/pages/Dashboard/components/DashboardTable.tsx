import { useDashboardTable } from "../hooks/useDashboardTable";
import { DashboardTHeader } from "./DashboardTHeader";
import { DashboardTRows } from "./DashboardTRows";
import { DashboardTFooter } from "./DashboardTFooter";
import { DashboardTableSkeleton } from "./DashboardTableSkeleton";

import type { DashboardTableProps } from "../types";

export function DashboardTable(props: DashboardTableProps) {
  const {
    days,
    loading,
    cellSize,
    projects,
    isEmptyProjects,
    findValueInDate,
    totalizeByDate,
    totalValueInDate,
    findValueInDateNoCost,
  } = useDashboardTable(props);

  if (loading) return <DashboardTableSkeleton />;

  return (
    <div className="dashboard-table-wrapper">
      <table className="table table-bordered dashboard-table bg-white">
        <DashboardTHeader days={days} cellSize={cellSize} />
        <tbody>
          <DashboardTRows
            days={days}
            isEmpty={isEmptyProjects}
            projects={projects}
            cellSize={cellSize}
            findValueInDateNoCost={findValueInDateNoCost}
            findValueInDate={findValueInDate}
          />
        </tbody>
        <DashboardTFooter
          days={days}
          isEmpty={isEmptyProjects}
          projects={projects}
          cellSize={cellSize}
          totalizeByDate={totalizeByDate}
          totalValueInDate={totalValueInDate}
          findValueInDateNoCost={findValueInDateNoCost}
        />
      </table>
    </div>
  );
}
