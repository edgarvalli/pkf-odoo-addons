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
export type EstatusVencimiento =
  | "vigente"
  | "vencida30"
  | "vencida60"
  | "vencida";

export interface Cliente {
  id: number;
  codigo: string;
  razonSocial: string;
  rfc: string;
  emails?: string;
  grupo?: GrupoValor;
}

export interface GrupoValor {
  id: number;
  codigo: string;
  nombre: string;
}

export interface Factura {
  id: number;
  cliente: Cliente;
  conceptoId: number;
  emails: string;
  estatus: EstatusVencimiento;
  fecha: Date;
  folio: number;
  saldoPendiente: number;
  serie: string;
  total: number;
  uuid: string;
}

export interface SaldoCliente {
  cliente: Cliente;
  saldoVigente: number;
  saldoVencido30: number;
  saldoVencido60: number;
  saldoVencido: number;
  saldoTotal: number;
  saldoTotalPendiente: number;
}
