import { useState } from "react";

export function useOrm() {
  const [fetching, setFetching] = useState(false);
  const call = async (
    model: string,
    method: string,
    args: any[],
    kwargs: Record<string, any> = {},
  ) => {
    setFetching(true);
    const url = "/web/dataset/call_kw"; // Odoo centraliza casi todo aquí

    const fullContext = Object.assign({}, kwargs.context || {});
    const fullKwargs = Object.assign({}, kwargs, { context: fullContext });

    // Odoo espera un formato JSON-RPC 2.0
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        model,
        method,
        args,
        kwargs: fullKwargs,
      },
      id: Math.floor(Math.random() * 1000 * 1000),
    };

    const request = await fetch(url, {
      method: "post",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!request.ok) throw new Error(`HTTP Error: ${request.statusText}`);

    const response = await request.json();

    // Manejo de errores específicos de Odoo
    if (response.error) {
      console.error("Odoo Server Error:", response.error);
      throw new Error(response.error.data.message || "Odoo RPC Error");
    }

    setFetching(false);
    return response.result;
  };

  return {
    fetching,
    call, // Exponemos call para métodos personalizados (button clicks, etc)
    async searchRead(
      model: string,
      domain: any[] = [],
      fields: string[] = [],
      kwargs: Record<string, any> = {},
    ) {
      return call(model, "search_read", [], {
        domain,
        fields,
        ...kwargs,
      });
    },

    async create(
      model: string,
      values: Record<string, any>[],
      kwargs: Record<string, any> = {},
    ) {
      // Odoo espera una lista de diccionarios para el método create en versiones recientes
      return call(model, "create", [values], kwargs);
    },

    async write(
      model: string,
      ids: number[],
      values: Record<string, any>,
      kwargs: Record<string, any> = {},
    ) {
      return call(model, "write", [ids, values], kwargs);
    },

    async unlink(
      model: string,
      ids: number[],
      kwargs: Record<string, any> = {},
    ) {
      return call(model, "unlink", [ids], kwargs);
    },

    async read(
      model: string,
      ids: number[],
      fields: string[] = [],
      kwargs: Record<string, any> = {},
    ) {
      return call(model, "read", [ids, fields], kwargs);
    },
  };
}
