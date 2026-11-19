import { useEffect, useState } from "react";

import type { OrmConfig, OdooSession } from "@/types/orm";
import { mapSessionInfo } from "@/mappers/odooSession";

export function useOrm() {
  const [fetching, setFetching] = useState(false);
  const [userSession, setSession] = useState<OdooSession | null>(null);

  async function call({
    model,
    method,
    args,
    kwargs,
  }: OrmConfig): Promise<any> {
    setFetching(true);
    const url = "/web/dataset/call_kw";

    const fullContext = Object.assign({}, kwargs?.context || {});
    const fullKwargs = Object.assign({}, kwargs, { context: fullContext });

    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        model,
        method,
        args: args ?? [[]],
        kwargs: fullKwargs,
      },
      id: Math.floor(Math.random() * 1000 * 1000),
    };

    try {
      const request = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!request.ok) throw new Error(`HTTP Error: ${request.statusText}`);

      const response = await request.json();

      if (response.error) {
        console.error("Odoo Server Error:", response.error);
        throw new Error(response.error.data?.message || "Odoo RPC Error");
      }

      return response.result;
    } finally {
      setFetching(false);
    }
  }

  const getSessionInfo = async () => {
    const url = "/web/session/get_session_info";

    const request = await fetch(url, {
      method: "post",
      body: JSON.stringify({ jsonrpc: "2.0", method: "call" }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!request.ok) {
      throw new Error(`HTTP Error: ${request.statusText}`);
    }

    const response = await request.json();
    if ("result" in response) {
      setSession(() => mapSessionInfo(response.result));
    }
  };

  useEffect(() => {
    getSessionInfo();
  }, []);
  return {
    fetching,
    userSession,
    call,
    async searchRead(
      model: string,
      domain: any[] = [],
      fields: string[] = [],
      kwargs: Record<string, any> = {},
    ) {
      return call({
        model,
        method: "search_read",
        args: [],
        kwargs: {
          domain,
          fields,
          ...kwargs,
        },
      });
    },
    async create(
      model: string,
      values: Record<string, any> | Record<string, any>[],
      kwargs: Record<string, any> = {},
    ): Promise<Record<string, any>[]> {
      const args = Array.isArray(values) ? [values] : [values];
      return call({ model, method: "create", args, kwargs });
    },

    async write(
      model: string,
      ids: number[],
      values: Record<string, any>,
      kwargs: Record<string, any> = {},
    ) {
      return call({ model, method: "write", args: [ids, values], kwargs });
    },
    async unlink(
      model: string,
      ids: number[],
      kwargs: Record<string, any> = {},
    ): Promise<boolean> {
      return call({ model, method: "unlink", args: [ids], kwargs });
    },

    async read(
      model: string,
      ids: number[],
      fields: string[] = [],
      kwargs: Record<string, any> = {},
    ): Promise<Record<string, any>[]> {
      return call({ model, method: "read", args: [ids, fields], kwargs });
    },
  };
}
