import { useEffect, useMemo, useState } from "react";

import { parseDateMX } from "@/utils/dates";
import { useSaldoClientes } from "@/hooks/useSaldoClientes";

import type { SaldoCliente } from "@/types/models";

type State = "VENCIDO30" | "VENCIDO60" | "VENCIDO" | "VIGENTE";

export function useAntiguedadSaldo() {
  const [saldos, setSaldo] = useState<SaldoCliente[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [saldoFiltered, setSaldoFiltered] = useState<SaldoCliente[]>([]);

  const { getSaldos } = useSaldoClientes();
  const today = parseDateMX(new Date());

  const saldoTotalPendiente = useMemo(() => {
    return saldos.reduce((prev, val) => prev + val.saldoTotalPendiente, 0);
  }, [saldos]);

  const totalVencido30 = useMemo(() => {
    return saldos.reduce((prev, val) => prev + val.saldoVencido30, 0);
  }, [saldos]);

  const totalVencido60 = useMemo(() => {
    return saldos.reduce((prev, val) => prev + val.saldoVencido60, 0);
  }, [saldos]);

  const totalVencido = useMemo(() => {
    return saldos.reduce((prev, val) => prev + val.saldoVencido, 0);
  }, [saldos]);

  const saldoVigente = useMemo(() => {
    return saldos.reduce((prev, val) => prev + val.saldoVigente, 0);
  }, [saldos]);

  const vencido = useMemo(
    () => totalVencido30 + totalVencido60 + totalVencido,
    [totalVencido, totalVencido30, totalVencido60],
  );

  const totalClientes = useMemo(() => saldos.length, [saldos]);
  const totalFacturas = useMemo(() => {
    return saldos.reduce((prev, item) => prev + item.totalFacturas, 0);
  }, [saldos]);

  const filterSaldos = (state: State) => {
    switch (state) {
      case "VENCIDO30":
        return saldos.filter((x) => x.saldoVencido30 > 0);
      case "VENCIDO60":
        return saldos.filter((x) => x.saldoVencido60 > 0);
      case "VENCIDO":
        return saldos.filter((x) => x.saldoVencido > 0);
      case "VIGENTE":
        return saldos.filter((x) => x.saldoVigente > 0);
      default:
        return [];
    }
  };

  const handleClickCard = (state: State) => {
    setSaldoFiltered(() => filterSaldos(state));
    setShowModal(true);
  };

  useEffect(() => {
    getSaldos().then((saldo) => setSaldo(saldo));
  }, []);

  return {
    saldos,
    saldoFiltered,
    today,
    vencido,
    showModal,
    saldoVigente,
    totalVencido,
    totalClientes,
    totalFacturas,
    totalVencido30,
    totalVencido60,
    saldoTotalPendiente,
    filterSaldos,
    setShowModal,
    handleClickCard,
  };
}
