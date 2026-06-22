import { useOrm } from "@/hooks";
import { AppContext } from "@/providers/app/provider";
import { useContext, useEffect, useState } from "react";

export function useAppProvider() {
  const [params, setParams] = useState<ParamsType>({ contpaqiApiUrl: "" });
  const orm = useOrm();
  const getParams = async () => {
    const result = await orm.call<ParamsType>(
      "pkf.factura.template",
      "get_config",
      [[]],
    );

    if (result) {
      setParams(result);
    }
  };

  useEffect(() => {
    getParams();
  }, []);

  return params;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("AppContext must be inside AppProvider.");
  }

  return ctx;
}
