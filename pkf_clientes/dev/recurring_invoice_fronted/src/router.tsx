import { createHashRouter, RouterProvider } from "react-router";
import InvoiceForm from "./pages/invoice-form";

const router = createHashRouter([
  {
    path: "/",
    element: <InvoiceForm />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
