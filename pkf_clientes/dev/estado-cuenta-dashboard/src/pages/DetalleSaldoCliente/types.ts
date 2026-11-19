import type { Cliente } from "@/types/models";

export interface DetalleHeaderPorps {
  cliente?: Cliente | null;
  saldo: number;
  facturasCount: number;
}

export interface FilterReferenceCardProps {
  references: string[];
  value?: string[];
  onChange?: (values: string[]) => void;
}
