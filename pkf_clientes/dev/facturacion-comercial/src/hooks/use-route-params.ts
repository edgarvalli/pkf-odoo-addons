import { useEffect, useState } from "react";
import { useMatches } from "react-router";

export function useRouteParams<T>() {
  const [params, setParams] = useState<T | Record<string, any>>({});
  const matches = useMatches();

  useEffect(() => {
    const current = matches[matches.length - 1];
    const _params: Record<string, any> = current.handle ?? {};
    document.title = _params.title ?? "Factura Comercial";
    setParams(_params);
  }, [matches]);

  return params as T;
}
