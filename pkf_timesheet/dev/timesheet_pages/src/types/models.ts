export interface Client {
  id: number;
  name: string;
  avatar: string;
}

export interface TimeEntry {
  id: number;
  date: string | Date;
  hours: number;
  note: string;
  project_id: number;
  task_id: number;
  phase_id: number;
}

export interface Task {
  id: number;
  code: string;
  name: string;
  description: string;
  order: number;
  estimated_hours: number;
  entries: Record<string, TimeEntry>;
}

export interface Phase {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

export interface Project {
  id: number;
  name: string;
  note: string;
  client: Client;
  phases: Phase[];
}

export interface TaskValue {
  phaseIndex: number;
  taskIndex: number;
  entryId?: number;
  key: string;
  value: string;
}
