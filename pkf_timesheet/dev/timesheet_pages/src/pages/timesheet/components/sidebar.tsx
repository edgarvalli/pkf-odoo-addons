import { useState, type ChangeEvent } from "react";
import { ClientCard } from "./client-card";
import { SearchProject } from "./search-project";
import { useOrm } from "../../../hooks/use-orm";
import { useTimesheet } from "../context";
import type { Project } from "../types/models";

type RangeDate = {
  startdate: string;
  enddate: string;
};
export function Sidebar() {
  const [rangeDates, setRangeDates] = useState<RangeDate>({
    startdate: "",
    enddate: "",
  });

  const orm = useOrm();
  const ctx = useTimesheet();
  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setRangeDates((prev) => ({ ...prev, [name as keyof RangeDate]: value }));
  };

  const getProject = async () => {
    if (ctx.projectId === 0) return;

    const result = await orm.call<Project | null>(
      "pkf.timesheet.project",
      "get_full_data",
      [[ctx.projectId]],
      { ...rangeDates },
    );

    ctx.setProject(result);
  };
  return (
    <aside className="bg-white p-2 shadow" style={{ width: 280 }}>
      <h6>Control de Tiempos</h6>
      <ClientCard />
      <SearchProject />
      <div className="d-flex flex-column mt-4">
        <div className="mb-3">
          <label
            htmlFor="startdate"
            className="form-label text-muted"
            style={{ fontSize: 12 }}
          >
            Desde
          </label>
          <input
            type="date"
            className="form-control"
            id="startdate"
            name="startdate"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="enddate"
            className="form-label text-muted"
            style={{ fontSize: 12 }}
          >
            Hasta
          </label>
          <input
            type="date"
            className="form-control"
            id="enddate"
            name="enddate"
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="btn btn-outline-primary" onClick={getProject}>
            Filtrar
          </button>
        </div>
      </div>
    </aside>
  );
}
