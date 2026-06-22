import { useOrm } from "@/hooks/use-orm";
import { useEffect, useRef, useState } from "react";

export function useSelectClient(initData?: Cliente[]) {
  const [data, setData] = useState<Cliente[]>(initData ?? []);
  const [clientSelected, setClientSelected] = useState<Cliente>({} as Cliente);
  const delay = useRef(0);
  const orm = useOrm();
  const fields = [
    "CIDCLIENTEPROVEEDOR idcliente",
    "CCODIGOCLIENTE codigo",
    "CRAZONSOCIAL razonSocial",
    "CRFC rfc",
  ];

  const searchClientAsync = (val: string) => {
    clearTimeout(delay.current);
    delay.current = setTimeout(async () => {
      searchClient(val);
    }, 500);
  };

  const searchClient = async (val: string) => {
    const result = await orm.call<Cliente[]>(
      "pkf.clientes",
      "buscar_clientes",
      [[]],
      { val, fields },
    );
    setData(result);
  };

  const handleItemSelected = (
    client: Cliente,
    onItemSelected?: (c: Cliente) => void,
  ) => {
    setClientSelected(client);
    onItemSelected?.(client);
  };

  useEffect(() => {
    if (!initData) return;
    searchClient("");
  }, [initData]);

  return {
    data,
    setData,
    searchClientAsync,
    searchClient,
    handleItemSelected,
    clientSelected,
  };
}
