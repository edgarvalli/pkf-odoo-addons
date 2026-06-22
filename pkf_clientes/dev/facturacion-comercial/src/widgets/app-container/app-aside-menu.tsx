import { router } from "@/pages";
import type { AppAsideMenuProps } from "./types";
import { useLocation, useNavigate } from "react-router";

export function AppAsideMenu(props: AppAsideMenuProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (name: string) => {
    return pathname === name ? "active" : "";
  };
  const renderMenuOptions = router.routes.map((route) => {
    return (
      <li className="list-group-item p-0" key={route.path}>
        <button
          className={`btn btn-link w-100 text-start ${isActive(route.path ?? "/")}`}
          onClick={() => navigate(route.path ?? "/")}
        >
          {route.handle?.title}
        </button>
      </li>
    );
  });

  return (
    <div className="h-100 w-25 p-2 bg-white shadow" hidden={props.hidden}>
      <h3>Facturacion Comercial</h3>
      <ul className="list-group list-group-flush mt-4">{renderMenuOptions}</ul>
    </div>
  );
}
