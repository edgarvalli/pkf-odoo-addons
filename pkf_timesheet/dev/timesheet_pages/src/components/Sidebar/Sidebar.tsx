import type { SidebarProps } from "./types";
import { SidebarOption } from "./SidebarOption";
import { useLocation, useNavigate } from "react-router";
export function Sidebar(props: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    const _string = path.startsWith("/") ? path : `/${path}`;
    return location.pathname === _string;
  };

  return (
    <aside
      className={`d-flex flex-column p-3 ${props.className ? props.className : ""}`}
    >
      <h5>Control de Tiempos</h5>
      <ul className="list-group list-group-flush">
        <SidebarOption
          text="Dashboard"
          icon="tachometer"
          active={isActive("dashboard")}
          onClick={() => navigate("dashboard")}
        />
        <SidebarOption
          text="Calendario"
          icon="calendar"
          active={isActive("calendar")}
          onClick={() => navigate("calendar")}
        />
      </ul>
    </aside>
  );
}
