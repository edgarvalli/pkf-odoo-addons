import { safeDateLocal } from "@/utils/dates";
import type { OdooSession, OdooContext } from "@/types/orm";

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
