import { useEffect, useMemo, useState } from "react";
import { useOrm } from "@/hooks/useOrm";
import { useParams } from "react-router";
import type { Cliente, Factura } from "@/types/models";
import { mapFactura } from "@/utils/mappers";

export function useDetalleSaldoCliente() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const orm = useOrm();

  const params = useParams();

  const totalFacturas = useMemo(() => facturas.length, [facturas]);
  const saldoPendiente = useMemo(
    () => facturas.reduce((total, f) => total + f.saldoPendiente, 0),
    [facturas],
  );

  const getFacturas = async () => {
    const cliente_id = Number(params.clienteId);

    const result = await orm.call<any[]>(
      "pkf.clientes",
      "facturas_by_cliente",
      [[]],
      {
        cliente_id,
      },
    );

    if (!result) return;

    const facturas = result.map(mapFactura);
    if (facturas.length > 0) setCliente(facturas[0].cliente);
    setFacturas(facturas);
  };

  useEffect(() => {
    getFacturas();
  }, []);
  return {
    loading: orm.fetching,
    facturas,
    cliente,
    totalFacturas,
    saldoPendiente,
    getFacturas,
  };
}
