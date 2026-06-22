import { useOrm } from "@/hooks/use-orm";
import { useEffect, useState } from "react";
import type { Metadata } from "../types";

export function useTemplateMetadata() {
  const [metadata, setMetadata] = useState<Metadata>({} as Metadata);
  const orm = useOrm();

  const getMetadata = async () => {
    const result = await orm.call<Metadata>(
      "pkf.contpaqi.factura.service",
      "get_metadata",
      [[]],
    );
    if (result) {
      setMetadata(result);
    }
  };

  useEffect(() => {
    getMetadata();
  }, []);

  return { metadata, getMetadata };
}
