import { useEffect, useState } from "react";
import type {
  ClientAction,
  OdooAction,
  ReportAction,
  URLAction,
  WindowAction,
} from "../types/orm";
import type { IUseOrm } from "../types/orm";
import type { OdooSession } from "../types/models";
import { mapSessionInfo } from "../utils/mappers";

/**
 * Hook para interactuar con el ORM de Odoo a través de llamadas JSON-RPC.
 * Proporciona métodos estándar para operaciones CRUD y ejecución de acciones.
 */
export function useOrm(): IUseOrm {
  const [fetching, setFetching] = useState(false);
  const [userSession, setSession] = useState<OdooSession | null>(null);

  async function call<T>(
    model: string,
    method: string,
    args: any[],
    kwargs: Record<string, any> = {},
  ): Promise<T> {
    setFetching(true);
    const url = "/web/dataset/call_kw";

    const fullContext = Object.assign({}, kwargs.context || {});
    const fullKwargs = Object.assign({}, kwargs, { context: fullContext });

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

  async function doAction<T = OdooAction>(
    action: OdooAction | string | number,
    extraContext?: Record<string, any>,
  ): Promise<T | any> {
    let actionDef: OdooAction;

    // 1. Resolución de la acción si es una referencia (ID o XMLID)
    if (typeof action === "string" || typeof action === "number") {
      actionDef = await call<OdooAction>(
        "ir.actions.actions",
        "run",
        [action],
        {
          context: extraContext,
        },
      );
    } else {
      actionDef = action;
    }

    if (!actionDef || !actionDef.type) {
      console.warn("No se pudo determinar la definición de la acción.");
      return;
    }

    // 2. Procesamiento según el tipo de acción
    switch (actionDef.type) {
      case "ir.actions.act_window":
        /**
         * Manejo de Window Actions: Apertura de vistas de modelos.
         * Aquí es donde integrarías tu lógica de navegación o Modales.
         */
        const windowAction = actionDef as WindowAction;
        const viewMode =
          windowAction.views?.[0]?.[1] || windowAction.view_mode || "form";

        console.log(
          `[WindowAction] Modelo: ${windowAction.res_model}, ID: ${windowAction.res_id}, Vista: ${viewMode}`,
        );

        // Ejemplo: Si usas una SPA, podrías actualizar el estado de navegación
        // dispatchNavigation(windowAction.res_model, windowAction.res_id, viewMode);
        break;

      case "ir.actions.act_url":
        /**
         * Manejo de URL Actions: Redirecciones internas o externas.
         */
        const urlAction = actionDef as URLAction;
        if (urlAction.url) {
          const target = urlAction.target === "new" ? "_blank" : "_self";
          window.open(urlAction.url, target);
        }
        break;

      case "ir.actions.report":
        /**
         * Manejo de Report Actions: Generación de documentos PDF/HTML.
         */
        const reportAction = actionDef as ReportAction;
        console.log(`[ReportAction] Generando: ${reportAction.report_name}`);

        // Ejemplo de URL estándar de Odoo para descarga de reportes
        const reportUrl = `/report/pdf/${reportAction.report_name}/${reportAction.context?.active_ids || ""}`;
        window.open(reportUrl, "_blank");
        break;

      case "ir.actions.client":
        /**
         * Manejo de Client Actions: Ejecución de widgets específicos.
         */
        const clientAction = actionDef as ClientAction;
        console.log(
          `[ClientAction] Ejecutando tag: ${clientAction.tag}`,
          clientAction.params,
        );
        break;

      case "ir.actions.server":
        /**
         * Las acciones de servidor suelen ser procesadas por el backend y retornar
         * una de las acciones anteriores. Si llega aquí, es una ejecución directa.
         */
        console.log(`[ServerAction] Ejecutada en el backend.`);
        break;

      default:
        console.warn(
          `Tipo de acción desconocido o no soportado: ${(actionDef as any).type}`,
        );
    }

    return actionDef;
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
    doAction,
    getSessionInfo,
    async searchRead<T>(
      model: string,
      domain: any[] = [],
      fields: string[] = [],
      kwargs: Record<string, any> = {},
    ) {
      return call<T[]>(model, "search_read", [], {
        domain,
        fields,
        ...kwargs,
      });
    },
    async create<T = number>(
      model: string,
      values: Record<string, any> | Record<string, any>[],
      kwargs: Record<string, any> = {},
    ) {
      const args = Array.isArray(values) ? [values] : [values];
      return call<T>(model, "create", args, kwargs);
    },

    async write(
      model: string,
      ids: number[],
      values: Record<string, any>,
      kwargs: Record<string, any> = {},
    ) {
      return call<boolean>(model, "write", [ids, values], kwargs);
    },
    async unlink<T = boolean>(
      model: string,
      ids: number[],
      kwargs: Record<string, any> = {},
    ) {
      return call<T>(model, "unlink", [ids], kwargs);
    },

    async read<T = any[]>(
      model: string,
      ids: number[],
      fields: string[] = [],
      kwargs: Record<string, any> = {},
    ) {
      return call<T>(model, "read", [ids, fields], kwargs);
    },
  };
}
