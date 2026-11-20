import type { ReactNode } from "react";

import { AntiguedadSaldoContext } from "./context";
import { AntiguedadSaldo } from "./components/AntiguedadSaldo";
import { useAntiguedadSaldo } from "./hooks/useAntiguedadSaldo";

export function AntiguedadSaldoProvider(props: { children?: ReactNode }) {
  const value = useAntiguedadSaldo();
  return (
    <AntiguedadSaldoContext.Provider value={value}>
      {props.children}
    </AntiguedadSaldoContext.Provider>
  );
}

export function AntiguedadSaldoPage() {
  return (
    <AntiguedadSaldoProvider>
      <AntiguedadSaldo />
    </AntiguedadSaldoProvider>
  );
}
