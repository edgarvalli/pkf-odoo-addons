import { useAntiguedadSaldo } from "./hooks/useAntiguedadSaldo";

export type AntiguedadSaldoContext = ReturnType<typeof useAntiguedadSaldo>;
export interface GridCardProps {
  title: string;
  value: number;
  formatNumber?: boolean;
  onClick?: () => void;
}
