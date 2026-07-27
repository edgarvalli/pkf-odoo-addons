import { useTimesheet } from "@/context/timesheet";
import type { Project } from "@/types/models";
import { getRangeDates } from "@/utils/dates";

export function useProject() {
  const { setProject, orm, setRangeDate } = useTimesheet();

  const getProject = async (
    projectId: number,
    startdate: string,
    enddate: string,
  ) => {
    const result = await orm.call<Project | null>(
      "pkf.timesheet.project",
      "get_full_data",
      [[projectId]],
      { startdate, enddate },
    );

    if (result) {
      result.period.startDate = new Date(result.period.startDate);
      result.period.endDate = new Date(result.period.endDate);
    }

    setProject(result);
    const dateRange = getRangeDates(startdate, enddate);
    setRangeDate(dateRange);
  };

  return { getProject, loading: orm.fetching };
}
