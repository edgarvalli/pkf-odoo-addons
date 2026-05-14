import { useOrm } from "@/hooks/use-orm";
export interface ComprobantesParams {
  startdate?: string;
  enddate?: string;
  limit?: number;
  metadata?: boolean;
}
export function useComprobantes() {
  const orm = useOrm();
  const getComprobantes = async (params: ComprobantesParams) => {
    const paramsCopy: ComprobantesParams = {
      ...params,
      limit: params.limit ?? 50,
      metadata: params.metadata ?? true,
    };

    const response = await orm.call("pkf.nominas", "comprobantes", [
      [],
      { ...paramsCopy },
    ]);

    console.log(response);
  };

  return { loading: orm.fetching, getComprobantes };
}
