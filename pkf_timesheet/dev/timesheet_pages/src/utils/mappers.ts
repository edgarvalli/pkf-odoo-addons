import type {
  OdooSession,
  OdooContext,
  TimeEntry,
  ModelBase,
  Project,
  Partner,
  PeriodProject,
  Phase,
  Task,
} from "@/types/models";

import { safeDateLocal } from "./dates";

export function mapSessionInfo(raw: any): OdooSession {
  const context: OdooContext = {
    lang: raw.user_context?.lang ?? "",
    tz: raw.user_context?.tz ?? "",
    uid: raw.user_context?.uid ?? 0,
  };

  return {
    activeIdsLimit: raw.active_ids_limit ?? 0,
    isAdmin: raw.is_admin ?? false,
    isInternalUser: raw.is_internal_user ?? false,
    isSystem: raw.is_system ?? false,
    maxFileUploadSize: raw.max_file_upload_size ?? 0,
    name: raw.name ?? "",
    partnerDisplayName: raw.partner_display_name ?? "",
    partnerId: raw.partner_id ?? 0,
    partnerWriteDate: safeDateLocal(raw.partner_write_date),
    registryHash: raw.registry_hash ?? "",
    serverVersion: raw.server_version ?? "",
    uid: raw.uid ?? 0,
    userContext: context,
    username: raw.username ?? "",
    ["web.base.url"]: raw["web.base.url"] ?? "",
  };
}

export function mapModelBase(row: Record<string, any>): ModelBase {
  return {
    createDate: row.create_date ? new Date(Date.parse(row.create_date)) : null,
    createById: Array.isArray(row.create_uid) ? row.create_uid[0] : null,
    createBy: Array.isArray(row.create_uid) ? row.create_uid[1] : "",
    writeDate: row.write_date ? new Date(Date.parse(row.write_date)) : null,
    writeById: Array.isArray(row.write_uid) ? row.write_uid[0] : null,
    writeBy: Array.isArray(row.write_uid) ? row.write_uid[1] : "",
  };
}

export function mapEntry(row: Record<string, any>): TimeEntry {
  return {
    ...mapModelBase(row),
    date: safeDateLocal(row.date) ?? new Date(),
    employeeId: Array.isArray(row.employee_id) ? row.employee_id[0] : 0,
    employeeName: Array.isArray(row.employee_id) ? row.employee_id[1] : "",
    hours: row.hours ?? 0,
    id: row.id ?? 0,
    note: row.note ?? "",
    phase: mapPhase(row.phase),
    task: mapTask(row.task),
    project: mapProject(row.project),
  };
}

export function mapPartner(row: Record<string, any>): Partner {
  return {
    id: row.id ?? 0,
    name: row.name ?? "",
    avatar: row.avatar_128 ?? "",
  };
}

export function mapTask(row: Record<string, any>): Task {
  return {
    id: row.id ?? 0,
    name: row.name ?? "",
    code: row.code ?? "",
    description: row.description ?? "",
    order: row.order ?? 0,
    estimated_hours: row.estimated_hours ?? 0,
    entries: row.entries,
  };
}

export function mapPhase(row: Record<string, any>): Phase {
  return {
    id: row.id ?? 0,
    name: row.name ?? "",
    code: row.code ?? "",
    description: row.description ?? "",
    tasks: Array.isArray(row.tasks) ? row.tasks.map(mapTask) : [],
  };
}

export function mapPeriodProject(row: Record<string, any>): PeriodProject {
  return {
    open: Boolean(row.period_open),
    startDate: safeDateLocal(row.period_start_date) ?? new Date(),
    endDate: safeDateLocal(row.period_end_date) ?? new Date(),
    type: row.period_type,
  };
}

export function mapProject(row: Record<string, any>): Project {
  return {
    ...mapModelBase(row),
    id: row.id ?? 0,
    partner: mapPartner(row.partner ?? {}),
    period: mapPeriodProject(row),
    note: row.note ?? "",
    name: row.name ?? "",
    isNotCargable: row.is_not_cargable,
    phases: Array.isArray(row.phases) ? row.phases.map(mapPhase) : [],
    totalHours: row.total_hours ?? {},
    totalHoursNoCost: row.total_hours_no_cost ?? {},
  };
}
