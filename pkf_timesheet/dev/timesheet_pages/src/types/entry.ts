import type { Phase } from "./models";

export type EntryRange = {
  project_id: number;
  phase_id: number;
  task_id: number;
  hours: number;
  startdate: string;
  enddate: string;
  note: string;
};

export interface EntryRangeProps {
  hidden?: boolean;
  phase: Phase | null;
  hideClient?: boolean;
  hidePhase?: boolean;
  onSave?: (entry: EntryRange) => void;
}

export interface EntryRangeRef {
  save(): void;
  getEntry(): EntryRange | null;
  resetForm(): void;
}
