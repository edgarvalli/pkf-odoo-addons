import { createHashRouter, Outlet, RouterProvider } from "react-router";
import { FadeTransition } from "./components";
import { DashboardPage, DetalleSaldoCliente } from "./pages";

export const Router = () => <RouterProvider router={routerPaths} />;

export function RouterHome() {
  return (
    <FadeTransition className="d-flex flex-column w-100">
      <Outlet />
    </FadeTransition>
  );
}

const routes = [
  { index: true, Component: DashboardPage },
  { path: "/detalle/:clienteId", Component: DetalleSaldoCliente },
];

export const routerPaths = createHashRouter([
  {
    path: "",
    Component: RouterHome,
    children: routes,
  },
  {
    path: "/",
    Component: RouterHome,
    children: routes,
  },
]);
