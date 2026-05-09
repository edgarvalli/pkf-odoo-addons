export interface OdooKwargs {
  context?: Record<string, any>;
  domain?: any[];
  fields?: string[];
  [key: string]: any;
}

export interface OrmModelActions {
  searchRead: (
    domain?: any[],
    fields?: string[],
    kwargs?: OdooKwargs,
  ) => Promise<any[]>;
  create: (
    values: Record<string, any> | Record<string, any>[],
    kwargs?: OdooKwargs,
  ) => Promise<number | number[]>;
  write: (
    ids: number[],
    values: Record<string, any>,
    kwargs?: OdooKwargs,
  ) => Promise<boolean>;
  unlink: (ids: number[], kwargs?: OdooKwargs) => Promise<boolean>;
  call: (method: string, args?: any[], kwargs?: OdooKwargs) => Promise<any>;
}

// Esto permite que el Proxy reconozca cualquier nombre de modelo como una propiedad
export type OrmProxy = {
  [modelName: string]: OrmModelActions;
};
