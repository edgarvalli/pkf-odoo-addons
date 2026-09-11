import { useState } from "react";
import { useEntries } from "./useEntries";
import { useFormState } from "./useFormState";
import { useDependecies } from "./useDependecies";
import { useCalendarDate } from "./useCalendarDate";
import type { TimeEntry } from "@/types/models";
import type { CalendarDay } from "../types";

export function useTimesheetCalendar() {
  // State
  const [isOpenEditForm, setOpenEditForm] = useState(false);
  const [isOpenShowMore, setOpenShowMore] = useState(false);
  const [entrySelected, setEntry] = useState<TimeEntry | null>(null);

  // Dependecies
  const { orm, projectRepository, entryRepository } = useDependecies();

  //Entries
  const { entries, getEntries, setEntries } = useEntries(entryRepository);

  // Dates
  const { currentDate, datesOfCalendar, previousMonth, nextMonth, goToToday } =
    useCalendarDate(entries, getEntries);

  //FormState
  const { isOpenForm, formDate, openForm } = useFormState();

  // Methods

  const openEditForm = (state: boolean, entry?: TimeEntry) => {
    setOpenEditForm(state);
    setEntry(entry ?? null);
  };

  const refreshEntries = () => getEntries(currentDate);

  const changePropertiesEntry = (key: keyof TimeEntry, value: any) => {
    if (!entrySelected) return;
    const obj: TimeEntry = { ...entrySelected, [key]: value };
    setEntry(obj);
  };

  const handleShowMoreClick = (item: CalendarDay) => {
    setEntries(item.entries);
    setOpenShowMore(true);
  };

  const openShowMore = (state: boolean) => setOpenShowMore(state);

  // Returns
  return {
    orm,
    entries,
    entrySelected,
    entryRepository,
    projectRepository,
    datesOfCalendar,
    currentDate,
    isOpenForm,
    isOpenEditForm,
    isOpenShowMore,
    formDate,
    previousMonth,
    nextMonth,
    goToToday,
    openForm,
    getEntries,
    openEditForm,
    openShowMore,
    refreshEntries,
    handleShowMoreClick,
    changePropertiesEntry,
  };
}
