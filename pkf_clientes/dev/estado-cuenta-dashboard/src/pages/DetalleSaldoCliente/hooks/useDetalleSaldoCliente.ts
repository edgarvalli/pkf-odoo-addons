import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import type { Cliente, Factura } from "@/types/models";
import { useSaldoClientes } from "@/hooks/useSaldoClientes";

export function useDetalleSaldoCliente() {
  const [referenceSelected, setReferenceSelected] = useState<string[]>([]);
  const [snapFacturas, setSnapFacturas] = useState<Factura[]>([]);
  const [cliente, setCliente] = useState<Cliente | null>(null);

  const params = useParams();
  const { loading, getFacturasByCliente } = useSaldoClientes();

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
    const clienteId = Number(params.clienteId);
    const facturas = await getFacturasByCliente(clienteId);

    setSnapFacturas(facturas);
    setCliente(facturas[0]?.cliente ?? null);
    setReferenceSelected([]);
  };

  useEffect(() => {
    getFacturas();
  }, [params.clienteId]);

  return {
    loading,
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
