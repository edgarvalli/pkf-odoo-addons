export interface ActionBarParams {
  startDate: Date;
  endDate: Date;
  projectId: number;
}

export interface Params {
  startDate: Date;
  endDate: Date;
  projectId: number;
}

export interface Column {
  name: string;
  label: string;
  date: Date;
}

export interface Client {
  id: number;
  name: string;
}

export interface TimeEntry {
  id: number;
  date: string | Date;
  hours: number;
  notes: string;
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
  /** * Diccionario donde la llave es la fecha (string)
   * y el valor son los datos de la entrada
   */
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
  client: Client;
  phases: Phase[];
}

export interface TaskValue {
  phaseIndex: number;
  taskIndex: number;
  key: string;
  value: string;
}
