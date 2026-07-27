import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRef, useState } from "react";
import { useTimesheet } from "@/context/timesheet";
import type { Phase } from "@/types/models";
import { EntryRangeForm } from "../entry-range";
import type { EntryRangeRef } from "src/types/entry";

type TaskGridEntriesNewEntryProps = {
  hidden?: boolean;
  phase: Phase | null;
};

export function TaskGridEntriesNewEntry(props: TaskGridEntriesNewEntryProps) {
  const { phase, hidden } = props;
  const [open, setOpen] = useState(false);
  const { project, orm } = useTimesheet();
  const formRef = useRef<EntryRangeRef | null>(null);

  if (!project || !phase || hidden) return null;

  const handleClose = () => {
    formRef.current?.save();
    setOpen(false);
  };

  const handleSave = async () => {
    handleClose();
  };

  return (
    <>
      <Button className="text-primary" onClick={() => setOpen(true)}>
        Registrar Rango
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        disableAutoFocus
      >
        <DialogTitle>{project.name}</DialogTitle>
        <DialogContent>
          <EntryRangeForm phase={phase} ref={formRef} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={orm.fetching}
          >
            {orm.fetching ? "Guardando..." : "Confirmar Registro"}
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
