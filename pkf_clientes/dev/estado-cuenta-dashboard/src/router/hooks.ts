import { useLocation, useNavigate } from "react-router";

export function useRouterMenu() {
  const menuOptions = [
    { text: "Dashboard", url: "/", icon: "fa-home" },
    { text: "Estado de Cuenta", url: "/estado-cuenta", icon: "fa-file" },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const isCurrentOption = (url: string) => {
    return location.pathname === url;
  };

  return {
    menuOptions,
    navigate,
    isCurrentOption,
  };
}
