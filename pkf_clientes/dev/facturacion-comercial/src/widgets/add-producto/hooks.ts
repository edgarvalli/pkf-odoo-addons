import { useOrm } from "@/hooks";
import { useEffect, useRef, useState } from "react";

export function useProducto(data?: Producto[]) {
  const [productos, setProductos] = useState<Producto[]>(data ?? []);
  const orm = useOrm();
  const delay = useRef(0);

  const getProductos = async (value = "") => {
    const result = await orm.call<Producto[]>(
      "pkf.contpaqi.factura.service",
      "get_productos",
      [[]],
      { value },
    );

    if (result) {
      setProductos(result);
    }
  };

  const searchAsync = (value: string) => {
    clearTimeout(delay.current);
    delay.current = setTimeout(() => {
      getProductos(value);
    }, 500);
  };

  useEffect(() => {
    if (!data) return;
    getProductos();
  }, [data]);

  return { productos, setProductos, getProductos, searchAsync };
}
