import type {
  OdooSession,
  OdooContext,
  Factura,
  SaldoCliente,
  Cliente,
} from "../types/models";
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

export function mapClienteByFactura(row: any): Cliente {
  return {
    id: row.cliente_id,
    razonSocial: row.cliente_name,
    rfc: row.cliente_rfc,
    codigo: row.cliente_codigo,
    emails: row.emails,
    grupo: {
      id: row.grupo_id,
      codigo: row.grupo_codigo,
      nombre: row.grupo_name,
    },
  };
}

export function mapFactura(row: Record<string, any>): Factura {
  return {
    id: row.id,
    conceptoId: row.concepto_id,
    emails: row.emails,
    fecha: safeDateLocal(row.fecha) ?? new Date(),
    folio: row.folio,
    serie: row.serie,
    uuid: row.uuid,
    estatus: row.estatus,
    saldoPendiente: Number(row.saldo_pendiente),
    total: Number(row.total),
    cliente: mapClienteByFactura(row),
  };
}

export function mapSaldoCliente(row: any): SaldoCliente {
  return {
    cliente: mapClienteByFactura(row),
    saldoTotal: row.saldo_total,
    saldoTotalPendiente: row.saldo_pendiente,
    saldoVencido: row.saldo_vencido,
    saldoVencido30: row.saldo_vencido30,
    saldoVencido60: row.saldo_vencido60,
    saldoVigente: row.saldo_vigente,
  };
}

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function convertValue(val: any): any {
  const sqlDateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  if (sqlDateRegex.test(val)) {
    return safeDateLocal(val);
  }
  if (Array.isArray(val)) {
    return val.map((v) => (typeof v === "object" ? mapToCamelCase(v) : v));
  }
  if (val && typeof val === "object") {
    return mapToCamelCase(val);
  }
  return val;
}

export function mapToCamelCase<T>(
  row: Record<string, any>,
  parseProp?: Record<string, <T>(key: string, value: any) => T>,
): T {
  const data: Record<string, any> = {};

  Object.keys(row).forEach((key) => {
    const camelKey = snakeToCamel(key);
    if (parseProp && key in parseProp) {
      data[camelKey] = parseProp[key](camelKey, row[key]);
    } else {
      data[camelKey] = convertValue(row[key]);
    }
  });

  return data as T;
}
