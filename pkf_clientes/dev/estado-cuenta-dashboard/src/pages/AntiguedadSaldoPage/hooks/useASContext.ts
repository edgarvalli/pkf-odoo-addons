import { useContext } from "react";
import { AntiguedadSaldoContext } from "../context";

export function useASContext() {
  const ctx = useContext(AntiguedadSaldoContext);
  if (!ctx) {
    throw new Error("useASContext must be inside provider.");
  }

  return ctx;
}
