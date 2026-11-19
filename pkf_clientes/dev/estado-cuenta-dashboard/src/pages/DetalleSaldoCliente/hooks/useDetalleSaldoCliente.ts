import { useEffect, useMemo, useRef, useState } from "react";
import { useOrm } from "@/hooks/useOrm";
import { useParams } from "react-router";
import type { Cliente, Factura } from "@/types/models";
import { mapFactura } from "@/utils/mappers";

export function useDetalleSaldoCliente() {
  const [referenceSelected, setReferenceSelected] = useState("");
  const [references, setReferences] = useState<string[]>([]);
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [cliente, setCliente] = useState<Cliente | null>(null);

  const snapFacturas = useRef<Factura[]>([]);
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
    snapFacturas.current = facturas;
    setFacturas(facturas);
    setReferences([...new Set(facturas.map((f) => f.referencia))]);
  };

  useEffect(() => {
    getFacturas();
  }, []);

  useEffect(() => {
    if (referenceSelected === "") return;
    if (referenceSelected === "ALL") return setFacturas(snapFacturas.current);
    setFacturas(
      snapFacturas.current.filter((f) => f.referencia === referenceSelected),
    );
  }, [referenceSelected]);

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
