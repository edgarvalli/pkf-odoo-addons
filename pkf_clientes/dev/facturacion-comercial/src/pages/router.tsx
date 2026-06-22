import { Home, FacturaTemplate } from "@/pages";
import { createHashRouter } from "react-router";
import { facturaRouter } from "@/pages/facturas-template/router";
import { FacturasConfig } from "./facturas-config";

export const router = createHashRouter([
  {
    path: "/",
    Component: Home,
    handle: {
      title: "Dashboard",
    },
  },
  {
    path: "/factura-template",
    Component: FacturaTemplate,
    children: facturaRouter,
    handle: {
      title: "Factura Template",
    },
  },
  {
    path: "/config",
    Component: FacturasConfig,
    handle: {
      title: "Configuraciones",
    },
  },
]);
