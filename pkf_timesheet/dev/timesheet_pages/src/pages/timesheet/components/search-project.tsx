import { useEffect, useState } from "react";
import { useOrm } from "../../../hooks/use-orm";
import { useTimesheet } from "../context";
import type { Project } from "../types/models";
import { EVSelect } from "@edgarvalli/ev-select";
import "@edgarvalli/ev-select/style.css";
import "../css/search-project.css";

export function SearchProject() {
  const [projects, setProjects] = useState<Project[]>([]);
  const orm = useOrm();
  const ctx = useTimesheet();

  // Función de búsqueda centralizada
  const getProjects = async (val: string): Promise<Project[]> => {
    try {
      const values = await orm.call<Project[]>(
        "pkf.timesheet.project",
        "search_projects_by_user",
        [val],
        { limit: 10 },
      );
      return values ?? [];
    } catch (err) {
      console.error("Search error:", err);
      return [];
    }
  };

  useEffect(() => {
    getProjects("").then((result) => setProjects(result));
  }, []);

  const handleSearch = async (val: string) => {
    const newProjects = await getProjects(val);

    if (newProjects) {
      setProjects(newProjects);
    }
  };

  return (
    <div>
      <EVSelect<Project>
        options={projects}
        label="Selecciona un Proyecto"
        keyExtractor={(item) => String(item.id)}
        keyName="name"
        disableInternalFilter
        onSearch={handleSearch}
        onChange={(project) => ctx.setProjectId(project.id)}
      />
    </div>
  );
}
