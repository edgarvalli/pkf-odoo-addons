import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";

import { exportTableToExcel } from "@/utils/exports";
import { useSaldoClientes } from "@/hooks/useSaldoClientes";

import type { SaldoCliente } from "@/types/models";

export function useEstadoCuenta() {
  const [saldos, setSaldos] = useState<SaldoCliente[]>([]);

  const snapSaldos = useRef<SaldoCliente[]>([]);
  const tableId = useId();
  const { loading, getSaldos } = useSaldoClientes();

  const fetchSaldoClientes = async () => {
    const saldos = await getSaldos();
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
        x.cliente.codigo.toLowerCase().includes(val) ||
        x.grupo.nombre.toLowerCase().includes(val)
      );
    });

    setSaldos(newSaldos);
  };

  const downloadReport = () => exportTableToExcel(tableId);

  useEffect(() => {
    fetchSaldoClientes();
  }, []);

  return {
    saldos,
    loading,
    tableId,
    fetchSaldoClientes,
    searchClientes,
    downloadReport,
  };
}
