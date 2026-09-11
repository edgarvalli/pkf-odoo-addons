import { useEffect, useState, type ChangeEvent } from "react";
import { useTimesheetCalendarContext as useTSCContext } from "../hooks";
import type { Project, Phase, Task } from "@/types/models";
import type { TimeEntryRange } from "@/types/IEntryRepository";
import { entryRepository } from "@/repositories";
import { parseISODate, safeDateLocal } from "@/utils/dates";

export function useTimesheetForm() {
  const { isOpenForm, openForm, formDate, orm, refreshEntries } =
    useTSCContext();
  const [projectSelected, setProject] = useState<Project | null>(null);
  const [phaseSelected, setPhase] = useState<Phase | null>(null);
  const [taskSelected, setTask] = useState<Task | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [note, setNote] = useState("");
  const [noCargable, setIsNotCargable] = useState(false);
  const [allowedRangeDate, setRangeDate] = useState<{
    from: string;
    to: string;
  } | null>(null);

  const entryRepo = entryRepository(orm);

  const createEntryValue = (
    projectId: number,
    phaseId: number,
    taskId: number,
  ): TimeEntryRange | null => {
    // Validando que sea mayor a 0
    const _hours = Number(hours);
    if (_hours <= 0) return null;

    // Validando Fechas
    const _startDate = safeDateLocal(startDate);
    let _endDate = safeDateLocal(endDate);

    if (!_startDate) return null;

    if (!_endDate) _endDate = _startDate;

    if (_endDate < _startDate) return null;

    return {
      projectId: projectId,
      phaseId: phaseId,
      taskId: taskId,
      hours: _hours,
      startDate: _startDate,
      endDate: _endDate,
      note,
      isNotCargable: noCargable,
    };
  };

  const buildEntryValues = (): TimeEntryRange | null => {
    //Validando que este seleccionado los datos del proyecto.
    if (!projectSelected || !phaseSelected || !taskSelected) return null;

    return createEntryValue(
      projectSelected.id,
      phaseSelected.id,
      taskSelected.id,
    );
  };

  const buildNoCargableEntryValues = (): TimeEntryRange | null => {
    if (!noCargable || !taskSelected) return null;
    return createEntryValue(0, 0, taskSelected.id);
  };

  const resetSelection = () => {
    setProject(null);
    setPhase(null);
    setTask(null);
  };

  const closeForm = () => {
    resetSelection();
    setHours("");
    setStartDate("");
    setEndDate("");
    setNote("");
    setIsNotCargable(false);
    openForm(false);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;

    switch (name) {
      case "startdate":
        setStartDate(value);
        break;
      case "enddate":
        setEndDate(value);
        break;
      case "hours":
        setHours(value);
        break;
      case "note":
        setNote(value);
        break;
      case "no_cargable":
        setIsNotCargable((prev) => !prev);
        break;
      default:
        console.log("Control no supported");
    }
  };

  const handleSave = async () => {
    const values = noCargable
      ? buildNoCargableEntryValues()
      : buildEntryValues();
    if (!values) return;

    await entryRepo.saveRange(values);
    refreshEntries();
    closeForm();
  };

  useEffect(() => {
    if (!projectSelected) return;
    if (projectSelected.period.open) return;

    setRangeDate({
      from: parseISODate(projectSelected.period.startDate),
      to: parseISODate(projectSelected.period.endDate),
    });
  }, [projectSelected]);

  useEffect(() => {
    setStartDate(formDate);
    setEndDate(formDate);
  }, [formDate]);

  return {
    orm,
    note,
    hours,
    endDate,
    startDate,
    isOpenForm,
    noCargable,
    projectSelected,
    phaseSelected,
    taskSelected,
    allowedRangeDate,
    setPhase,
    setTask,
    openForm,
    closeForm,
    setProject,
    handleSave,
    resetSelection,
    handleInputChange,
  };
}
