import type { Dispatch, SetStateAction } from "react";
import type { Comprobante, Empleado } from "@/types/models";

export interface IResponse {
  comprobantes: Comprobante[];
  empleado?: Empleado;
}

export interface ComprobantesParams {
  startdate?: string;
  enddate?: string;
  limit?: number;
  metadata?: boolean;
}

export interface IRecibosContext {
  loading: boolean;
  empleado: Empleado | null;
  comprobantes: Comprobante[];
  setLoading: Dispatch<SetStateAction<boolean>>;
  setEmpleado: Dispatch<SetStateAction<Empleado | null>>;
  setComprobantes: Dispatch<SetStateAction<Comprobante[]>>;
}

export interface IRecibosHook extends IRecibosContext {
  getComprobantes(params: ComprobantesParams): Promise<void>;
}
