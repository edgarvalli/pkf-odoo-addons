import { useEffect, useState, useMemo, useCallback } from "react";
import { useOrm } from "@/hooks/useOrm";
import { entryRepository } from "@/repositories";
import type { Project } from "@/types/models";
import { parseISODate } from "@/utils/dates";
import type { DashboardTableProps } from "../types";

export function useDashboardTable(props: DashboardTableProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Usamos directamente el rango que viene del padre
  const days = props.rangeOfDate ?? [];

  const cellSize = 40;

  const orm = useOrm();
  const repo = entryRepository(orm);

  const isEmptyProjects = projects.length === 0;

  const projectHoursMap = useMemo(() => {
    const map = new Map<number, Record<string, number>>();
    projects.forEach((p) => map.set(p.id, p.totalHours));
    return map;
  }, [projects]);

  const projectHoursMapNoCost = useMemo(() => {
    const map = new Map<number, Record<string, number>>();
    projects.forEach((p) => map.set(p.id, p.totalHoursNoCost));
    return map;
  }, [projects]);

  const findValueInDate = useCallback(
    (projectId: number, date: Date) => {
      const key = parseISODate(date);
      return projectHoursMap.get(projectId)?.[key] ?? 0;
    },
    [projectHoursMap],
  );

  const findValueInDateNoCost = useCallback(
    (date: Date) => {
      const key = parseISODate(date);
      let total = 0;
      for (const hoursObj of projectHoursMapNoCost.values()) {
        if (hoursObj[key]) total += hoursObj[key];
      }
      return total;
    },
    [projectHoursMapNoCost],
  );

  const totalValueInDate = useCallback(
    (date: Date) => {
      const key = parseISODate(date);
      let total = 0;
      for (const hoursObj of projectHoursMap.values()) {
        if (hoursObj[key]) total += hoursObj[key];
      }
      return total;
    },
    [projectHoursMap],
  );

  const totalizeByDate = useCallback(
    (date: Date) => {
      const key = parseISODate(date);
      let total = 0;
      for (const hoursObj of projectHoursMap.values()) {
        if (hoursObj[key]) total += hoursObj[key];
      }
      for (const hoursObj of projectHoursMapNoCost.values()) {
        if (hoursObj[key]) total += hoursObj[key];
      }
      return findValueInDateNoCost(date) + totalValueInDate(date);
    },
    [projectHoursMap],
  );

  const totalsByDay = useMemo(() => {
    const totals: Record<string, number> = {};
    days.forEach((day) => {
      const key = parseISODate(day);
      totals[key] = projects.reduce(
        (acc, p) => acc + (projectHoursMap.get(p.id)?.[key] ?? 0),
        0,
      );
    });
    return totals;
  }, [days, projects, projectHoursMap]);

  useEffect(() => {
    const total = Object.values(totalsByDay).reduce((acc, h) => h + acc, 0);
    props.onSumHours?.(total);
  }, [totalsByDay]);

  // ✅ Ahora depende de days → cada vez que cambie el rango, se llama al API
  useEffect(() => {
    if (!days || days.length === 0) return;
    const fetchData = async () => {
      setLoading(true);
      const startDate = days[0];
      const endDate = days[days.length - 1];
      const result = await repo.getTotalizeByProject(startDate, endDate);
      setTimeout(() => setLoading(false), 100);
      setProjects(result);
    };
    fetchData();
  }, [days]);

  return {
    days,
    loading,
    cellSize,
    projects,
    isEmptyProjects,
    totalsByDay,
    totalizeByDate,
    findValueInDate,
    totalValueInDate,
    findValueInDateNoCost,
  };
}
