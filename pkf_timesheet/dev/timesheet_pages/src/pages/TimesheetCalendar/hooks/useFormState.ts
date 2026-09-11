import { useState } from "react";
import { parseISODate } from "@/utils/dates";

export function useFormState() {
  const [isOpenForm, setOpenForm] = useState(false);
  const [formDate, setDate] = useState<string>("");

  const openForm = (state: boolean, date?: Date | string) => {
    setOpenForm(state);
    if (!date) return;
    const _date = date instanceof Date ? parseISODate(date) : date;
    setDate(_date);
  };

  return { isOpenForm, formDate, openForm };
}
