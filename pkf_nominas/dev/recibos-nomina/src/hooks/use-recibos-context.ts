import { useContext } from "react";
import { useOrm } from "@/hooks/use-orm";
import { RecibosContext } from "@/components/recibos/recibos-context";
import type {
  ComprobantesParams,
  IRecibosHook,
  IResponse,
} from "@/types/context";
import type { Comprobante } from "@/types/models";

export function useRecibosContext(): IRecibosHook {
  const ctx = useContext(RecibosContext);
  if (!ctx) throw new Error("Recibos Context must be inside of provider.");

  const orm = useOrm();

  const getComprobantes = async (params: ComprobantesParams) => {
    ctx.setLoading(true);
    const paramsCopy: ComprobantesParams = {
      ...params,
      limit: params.limit ?? 50,
      metadata: params.metadata ?? true,
    };

    const result = await orm.call<IResponse | Comprobante[]>(
      "pkf.nominas",
      "comprobantes",
      [[], { ...paramsCopy }],
    );

    if (params.metadata) {
      const response = result as IResponse;
      ctx.setComprobantes(response.comprobantes);
      ctx.setEmpleado(response.empleado ?? null);
    } else {
      ctx.setComprobantes(result as Comprobante[]);
    }
    ctx.setLoading(false);
  };

  return { ...ctx, getComprobantes };
}
