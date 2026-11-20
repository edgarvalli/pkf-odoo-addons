import type { ChangeEvent } from "react";
import type { SaldoCliente } from "@/types/models";

export interface SaldosHeaderProps {
  searchClientes?: (e: ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
  downloadReport?: () => void;
  hideTitle?: boolean;
}

export interface SaldosTableProps {
  saldos: SaldoCliente[];
  tableId: string;
  loading?: boolean;
  cancelClick?: boolean;
}

export interface SaldosModalProps {
  show: boolean;
  onClose: () => void;
  headerProps: SaldosHeaderProps;
  tableProps: SaldosTableProps;
}
