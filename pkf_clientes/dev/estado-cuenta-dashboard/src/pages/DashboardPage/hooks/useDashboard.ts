import { useOrm } from "@/hooks/useOrm";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { SaldoCliente } from "@/types/models";
import { mapSaldoCliente } from "@/utils/mappers";

export function useDashboard() {
  const [saldos, setSaldos] = useState<SaldoCliente[]>([]);
  const snapSaldos = useRef<SaldoCliente[]>([]);
  const orm = useOrm();

  const fetchSaldoClientes = async () => {
    const result = await orm.call<Record<string, any>[]>(
      "pkf.clientes",
      "saldo_by_segmento",
      [[]],
    );

    if (!result) return;
    const saldos = result.map(mapSaldoCliente);
    snapSaldos.current = saldos;
    setSaldos(saldos);
  };

  const searchClientes = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const val = value.toLowerCase();

    if (val === "") return setSaldos(snapSaldos.current);

    const newSaldos = snapSaldos.current.filter((x) => {
      if (!x.cliente) return false;
      return (
        x.cliente.razonSocial.toLowerCase().includes(val) ||
        x.cliente.codigo.toLowerCase().includes(val)
      );
    });

    setSaldos(newSaldos);
  };

  useEffect(() => {
    fetchSaldoClientes();
  }, []);

  return { saldos, loading: orm.fetching, fetchSaldoClientes, searchClientes };
}
