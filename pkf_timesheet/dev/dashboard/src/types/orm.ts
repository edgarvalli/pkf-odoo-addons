export interface OrmConfig {
  model: string;
  method: string;
  args?: any[];
  kwargs?: Record<string, any>;
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
