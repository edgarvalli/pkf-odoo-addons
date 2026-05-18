export interface Empleado {
  codigo: string;
  nombre: string;
  rfc: string;
  curp: string;
  fechaalta: string;
  numerosegurosocial: string;
  codigopostal: string;
  tiposalario: string;
  jornada: string;
  puesto: string;
  departamento: string;
  correo: string;
  sbc: number;
  cidregistropatronal: number;
}

export interface Comprobante {
  iddocumento: number;
  idperiodo: number;
  fechaemision: string;
  fechapago: string;
  fechafinal: string;
  fechainicial: string;
  diaspagados: number;
  uuid: string;
  guiddocdsl: string;
  guiddocumento: string;
  sbc: number;
  total: string;
  nombreemisor: string;
  rfcemisor: string;
}
