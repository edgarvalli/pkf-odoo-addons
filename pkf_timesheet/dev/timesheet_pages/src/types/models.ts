export interface Partner {
  id: number;
  name: string;
  avatar: string;
}

export interface ModelBase {
  createDate?: Date | null;
  createBy?: string;
  createById?: number;
  writeDate?: Date | null;
  writeBy?: string;
  writeById?: number;
}

export interface TimeEntry extends ModelBase {
  id: number;
  date: Date;
  employeeId: number;
  employeeName: string;
  hours: number;
  note: string;
  project: Project;
  phase: Phase;
  task: Task;
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
  code: string;
  description: string;
  tasks: Task[];
}

export interface PeriodProject {
  open: boolean;
  type: "weekly" | "biweekly" | "monthly";
  startDate: Date;
  endDate: Date;
}

export interface Project {
  id: number;
  name: string;
  note: string;
  period: PeriodProject;
  partner: Partner;
  phases: Phase[];
  isNotCargable: boolean;
  totalHours: Record<string, number>;
  totalHoursNoCost: Record<string, number>;
}

export interface OdooContext {
  lang: string;
  tz: string;
  uid: number;
}

export interface OdooSession {
  activeIdsLimit: number;
  isAdmin: boolean;
  isInternalUser: boolean;
  isSystem: boolean;
  maxFileUploadSize: number;
  name: string;
  partnerDisplayName: string;
  partnerId: number;
  partnerWriteDate: Date | null;
  registryHash: string;
  serverVersion: string;
  uid: number;
  userContext: OdooContext;
  username: string;
  ["web.base.url"]: string;
}
