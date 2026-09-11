import type { OdooSession } from "./models";

// Tipos base de acciones Odoo (puedes expandirlos según tu implementación real)
export interface OdooAction {
  type: string;
  [key: string]: any;
}

export interface WindowAction extends OdooAction {
  res_model: string;
  res_id?: number;
  views?: [number, string][];
  view_mode?: string;
}

export interface URLAction extends OdooAction {
  url: string;
  target?: "new" | "self";
}

export interface ReportAction extends OdooAction {
  report_name: string;
  context?: Record<string, any>;
}

export interface ClientAction extends OdooAction {
  tag: string;
  params?: Record<string, any>;
}

// Interfaz principal del hook
export interface IUseOrm {
  fetching: boolean;
  userSession?: OdooSession | null;
  call<T>(
    model: string,
    method: string,
    args: any[],
    kwargs?: Record<string, any>,
  ): Promise<T>;

  doAction<T = OdooAction>(
    action: OdooAction | string | number,
    extraContext?: Record<string, any>,
  ): Promise<T | any>;

  getSessionInfo(): Promise<any>;

  searchRead<T>(
    model: string,
    domain?: any[],
    fields?: string[],
    kwargs?: Record<string, any>,
  ): Promise<T[]>;

  create<T = number>(
    model: string,
    values: Record<string, any> | Record<string, any>[],
    kwargs?: Record<string, any>,
  ): Promise<T>;

  write(
    model: string,
    ids: number[],
    values: Record<string, any>,
    kwargs?: Record<string, any>,
  ): Promise<boolean>;

  unlink<T = boolean>(
    model: string,
    ids: number[],
    kwargs?: Record<string, any>,
  ): Promise<T>;

  read<T = any[]>(
    model: string,
    ids: number[],
    fields?: string[],
    kwargs?: Record<string, any>,
  ): Promise<T>;
}
