import type { Cliente } from "@/types/models";

export interface DetalleHeaderPorps {
  cliente?: Cliente | null;
  saldo: number;
  facturasCount: number;
}
