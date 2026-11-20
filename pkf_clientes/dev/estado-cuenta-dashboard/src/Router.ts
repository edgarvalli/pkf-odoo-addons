import { createHashRouter, type RouteObject } from "react-router";
import { RouterHome } from "./router/RouterHome";
import { DashboardPage, DetalleSaldoCliente, EstadoCuentaPage } from "./pages";

const routes: RouteObject[] = [
  { path: "", Component: DashboardPage },
  {
    path: "estado-cuenta",
    Component: EstadoCuentaPage,
  },
  {
    path: "estado-cuenta/detalle/:clienteId",
    Component: DetalleSaldoCliente,
  },
];

export const routerPaths = createHashRouter([
  {
    path: "",
    Component: RouterHome,
    children: routes,
  },
]);
