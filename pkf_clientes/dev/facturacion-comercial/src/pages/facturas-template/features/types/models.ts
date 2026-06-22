export interface FacturaTemplate {
  id?: number;
  iddocumentode?: number;
  idconcepto?: number;
  idcomercial?: number;
  idcliente?: number;
  idmoneda?: number;
  codigo_cliente?: string;
  moneda?: string;
  concepto?: string;
  codigo_concepto?: string;
  serie?: string;
  folio?: number;
  razonsocial?: string;
  rfc?: string;
  pago?: number;
  total_pagos?: number;
  total?: number;
  referencia?: string;
  observaciones_template?: string;
  movimientos?: FacturaTemplateMovimientos[];
  write_date?: string;
  create_date?: string;
  write_uid?: string[] | number[];
  create_uid?: string[] | number[];
}

export interface FacturaTemplateMovimientos {
  id?: number;
  idcomercial?: number;
  idproducto?: number;
  unidades?: number;
  precio?: number;
  segmento?: string;
  neto?: number;
  producto?: string;
  codigo_producto?: string;
}
