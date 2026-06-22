declare global {
  type ToastType = "success" | "warning" | "error" | "info";
  interface Window {
    toast(message: string, type?: ToastType): void;
  }

  interface Concepto {
    idconcepto: number;
    codigo: string;
    nombre: string;
  }

  interface Moneda {
    idmoneda: number;
    nombre: string;
    simbolo: string;
    plural: string;
    claveSat: string;
  }

  interface Cliente {
    idcliente: number;
    codigo: string;
    razonSocial: string;
    rfc: string;
  }
  interface Producto {
    idproducto: number;
    codigo: string;
    nombre: string;
    idtipo: string;
    fechaAlta: string;
    precio: number;
  }

  interface ParamsType {
    contpaqi_api_url: string;
  }

  type BSTextColor =
    | "text-muted"
    | "text-primary"
    | "text-danger"
    | "text-warning"
    | "text-success";
}

export {};
