import { useEffect, useState } from "react";
import { useTimesheet } from "@/context/timesheet";
import type { Project } from "@/types/models";
import {
  Autocomplete,
  TextField,
  type AutocompleteRenderInputParams,
} from "@mui/material";

export function SearchProject(props: { onItemSelected(id: number): void }) {
  const [value, setValue] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const { orm } = useTimesheet();

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

  const renderOptions = (params: AutocompleteRenderInputParams) => {
    return (
      <TextField {...params} label="Selecciona Projecto" variant="standard" />
    );
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

  return (
    <Autocomplete
      disablePortal
      options={projects}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option.name}
      renderInput={renderOptions}
      onInputChange={(e) => setValue((e.target as HTMLInputElement).value)}
      loading={orm.fetching}
      onChange={(_, value) => {
        if (value) props.onItemSelected?.(value.id);
      }}
    />
  );
}
