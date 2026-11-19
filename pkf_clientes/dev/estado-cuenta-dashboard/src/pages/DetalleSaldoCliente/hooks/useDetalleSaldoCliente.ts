import { useEffect, useMemo, useState } from "react";
import { useOrm } from "@/hooks/useOrm";
import { useParams } from "react-router";
import type { Cliente, Factura } from "@/types/models";
import { mapFactura } from "@/utils/mappers";

export function useDetalleSaldoCliente() {
  const [referenceSelected, setReferenceSelected] = useState<string[]>([]);
  const [snapFacturas, setSnapFacturas] = useState<Factura[]>([]);
  const [cliente, setCliente] = useState<Cliente | null>(null);

  const orm = useOrm();
  const params = useParams();

  const references = useMemo(
    () => [...new Set(snapFacturas.map((f) => f.referencia))],
    [snapFacturas],
  );

  const facturas = useMemo(() => {
    if (referenceSelected.length === 0) return snapFacturas;

    return snapFacturas.filter((f) => referenceSelected.includes(f.referencia));
  }, [snapFacturas, referenceSelected]);

  const totalFacturas = facturas.length;

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
      { cliente_id },
    );

    if (!result) return;

    const facturas = result.map(mapFactura);

    setSnapFacturas(facturas);
    setCliente(facturas[0]?.cliente ?? null);
    setReferenceSelected([]);
  };

  useEffect(() => {
    getFacturas();
  }, [params.clienteId]);

  return {
    loading: orm.fetching,
    facturas,
    cliente,
    references,
    totalFacturas,
    saldoPendiente,
    referenceSelected,
    setReferenceSelected,
    getFacturas,
  };
}
