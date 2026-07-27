import { useTimesheet } from "@/context/timesheet";
import { useEffect, useState } from "react";

export type ProjectKeyPair = {
  id: number;
  name: string;
};

export function useSidebar() {
  const { orm } = useTimesheet();
  const [value, setValue] = useState("");
  const [projects, setProjects] = useState<ProjectKeyPair[]>([]);

  // Función de búsqueda centralizada
  const getProjects = async (val: string): Promise<ProjectKeyPair[]> => {
    try {
      const values = await orm.call<ProjectKeyPair[]>(
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
    if (!value) return;
    const task = setTimeout(async () => {
      const result = await getProjects(value.toLowerCase());
      if (!result) return;
      setProjects(result);
    }, 500);

    return () => clearTimeout(task);
  }, [value]);

  useEffect(() => {
    getProjects("").then((result) => setProjects(result));
  }, []);

  return { projects, getProjects, value, setValue, orm };
}
