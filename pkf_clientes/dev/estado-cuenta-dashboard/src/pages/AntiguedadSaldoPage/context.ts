import { createContext } from "react";
import { useAntiguedadSaldo } from "./hooks/useAntiguedadSaldo";

type ContextType = ReturnType<typeof useAntiguedadSaldo>;
export const AntiguedadSaldoContext = createContext<ContextType | null>(null);
