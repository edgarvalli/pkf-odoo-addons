import { useSidebar } from "./use-sidebar";
import {
  Autocomplete,
  TextField,
  type AutocompleteRenderInputParams,
} from "@mui/material";

export function SearchProject(props: { onItemSelected(id: number): void }) {
  const { projects, setValue, orm } = useSidebar();

  const renderOptions = (params: AutocompleteRenderInputParams) => {
    return (
      <TextField {...params} label="Selecciona Projecto" variant="standard" />
    );
  };

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
