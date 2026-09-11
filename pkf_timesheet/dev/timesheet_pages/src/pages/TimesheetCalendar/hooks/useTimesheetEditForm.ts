import { useTimesheetCalendarContext as useTSCContext } from "../hooks";
import { entryRepository } from "@/repositories";
import { isAllowedToDo } from "@/utils/entry";

export function useTimesheetEditForm() {
  const {
    orm,
    entrySelected,
    isOpenEditForm,
    openEditForm,
    refreshEntries,
    changePropertiesEntry,
  } = useTSCContext();

  const repo = entryRepository(orm);

  const handleUpdate = async () => {
    if (!entrySelected || !isAllowedToDo(entrySelected)) return;
    await repo.update({
      id: entrySelected.id,
      hours: entrySelected.hours,
      note: entrySelected.note,
    });
    openEditForm(false);
    refreshEntries();
  };

  const removeEntry = async () => {
    if (!entrySelected) return;
    const result = await repo.remove(entrySelected);
    if (!result) return alert("Ocurrio un error al elminar el entry.");
    openEditForm(false);
    refreshEntries();
  };

  return {
    isOpenEditForm,
    entrySelected,
    openEditForm,
    changePropertiesEntry,
    handleUpdate,
    removeEntry,
  };
}
