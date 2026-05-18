import type { IRecibosContext } from "@/types/context";
import type { Comprobante, Empleado } from "@/types/models";
import { createContext, useState, type ReactNode } from "react";

export const RecibosContext = createContext<IRecibosContext | null>(null);

export function RecibosProvider({ children }: { children: ReactNode }) {
  const [empleado, setEmpleado] = useState<Empleado | null>(null);
  const [comprobantes, setComprobantes] = useState<Comprobante[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const values = {
    loading,
    empleado,
    comprobantes,
    setLoading,
    setEmpleado,
    setComprobantes,
  };
  return (
    <RecibosContext.Provider value={values}>{children}</RecibosContext.Provider>
  );
}
