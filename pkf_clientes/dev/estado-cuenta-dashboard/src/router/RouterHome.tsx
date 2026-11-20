import { Outlet } from "react-router";
import { RouterMenu } from "./RouterMenu";

export function RouterHome() {
  return (
    <div className="router-home">
      <RouterMenu />

      <section className="router-content">
        <Outlet />
      </section>
    </div>
  );
}
