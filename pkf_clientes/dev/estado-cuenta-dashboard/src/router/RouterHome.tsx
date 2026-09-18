import { FadeTransition } from "@/components";
import { Outlet } from "react-router";

export function RouterHome() {
  return (
    <FadeTransition className="d-flex flex-column w-100">
      <Outlet />
    </FadeTransition>
  );
}
