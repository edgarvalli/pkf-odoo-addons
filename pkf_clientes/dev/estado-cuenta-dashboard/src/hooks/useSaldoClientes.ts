import { useOrm } from "@/hooks/useOrm";
import { mapFactura } from "@/utils/mappers";
import { mapSaldoCliente } from "@/utils/mappers";

import type { SaldoCliente } from "@/types/models";
import type { Factura } from "@/types/models";
export function useSaldoClientes() {
  const orm = useOrm();

  const getSaldos = async (): Promise<SaldoCliente[]> => {
    const result = await orm.call<Record<string, any>[]>(
      "pkf.clientes",
      "saldo_by_segmento",
      [[]],
      {
        include_vigentes: true,
      },
    );

    if (!result) return [];
    return result.map(mapSaldoCliente);
  };

  const getFacturasByCliente = async (
    clienteId: number,
  ): Promise<Factura[]> => {
    const result = await orm.call<any[]>(
      "pkf.clientes",
      "facturas_by_cliente",
      [[]],
      { cliente_id: clienteId },
    );

    if (!result) return [];
    return result.map(mapFactura);
  };

  return { loading: orm.fetching, getSaldos, getFacturasByCliente };
}
