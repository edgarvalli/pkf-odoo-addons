import { useRef } from "react";
import { AppAsideMenu } from "./app-aside-menu";
import { useFullScreen } from "@/hooks/use-full-screen";
import type { AppContainerProps } from "./types";

import "./app.css";
import { useRouteParams } from "@/hooks/use-route-params";

export function AppContainer(props: AppContainerProps) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  useFullScreen(mainRef);
  useRouteParams();
  return (
    <div className="d-flex overflow-hidden" ref={mainRef}>
      <div className="d-flex flex-grow-1">
        <AppAsideMenu
          hidden={props.hideAsideMenu}
          children={props.asideMenuChildren}
          title={props.title}
        />
        <div
          className={`w-100 d-flex flex-column flex-grow-1 ${props.className}`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
