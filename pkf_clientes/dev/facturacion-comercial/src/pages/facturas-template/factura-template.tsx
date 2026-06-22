import { useRef } from "react";
import { Outlet } from "react-router";

import { useFullScreen } from "@/hooks/use-full-screen";
import { AppContainer, Tabs, type Tab } from "@/widgets";
import { FacturasHeader, FacturasTable } from "./features/components";

const tabsFacturas: Tab[] = [
  {
    name: "activas",
    title: "Activas",
    element: <FacturasTable active={true} />,
  },
  {
    name: "complete",
    title: "Terminadas",
    element: <FacturasTable active={false} />,
  },
];

export function FacturaTemplateRoot() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  useFullScreen(mainRef);

  return (
    <div className="container d-flex flex-column m-h-1" ref={mainRef}>
      <div className="row">
        <div className="col">
          <FacturasHeader />
        </div>
      </div>
      <div className="row d-flex flex-column flex-grow-1 min-h mb-2">
        <div className="col d-flex flex-column flex-grow-1 min-h">
          <main className="bg-white shadow-sm d-flex flex-column flex-grow-1 min-h">
            <Tabs
              tabList={tabsFacturas}
              className="d-flex flex-column flex-grow-1 min-h"
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export function FacturaTemplate() {
  return (
    <AppContainer>
      <Outlet />
    </AppContainer>
  );
}
