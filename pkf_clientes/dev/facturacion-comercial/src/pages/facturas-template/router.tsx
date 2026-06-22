import { FacturaTemplateRoot } from "./factura-template";
import { FacturaTemplateForm } from "./factura-template-form";
import { type RouteObject } from "react-router";

export const facturaRouter: RouteObject[] = [
  {
    index: true,
    Component: FacturaTemplateRoot,
    handle: {
      title: "Factura Template",
    },
  },
  {
    path: "form",
    Component: FacturaTemplateForm,
    handle: {
      title: "Factura Template - Form",
    },
  },
  {
    path: "form/:id",
    Component: FacturaTemplateForm,
    handle: {
      title: "Factura Template - Form",
    },
  },
];
