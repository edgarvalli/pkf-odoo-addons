import { useState } from "react";
import { ClientCard } from "./client-card";
import { SearchProject } from "./search-project";
import { SidebarFilter } from "./sidebar-filter";
import { SidebarSave } from "./sidebar-save";

export function Sidebar() {
  const [projectId, setProjectId] = useState<number | null>(null);
  return (
    <aside className="row flex-lg-column bg-white p-2 shadow sidebar">
      <h6 className="mb-4 d-none d-lg-block">Control de Tiempos</h6>
      <div className="col-12 col-sm-3 col-lg-12 mb-3">
        <ClientCard />
      </div>
      <div className="col-3 col-lg-12">
        <SearchProject onItemSelected={setProjectId} />
      </div>
      <div className="col-6 col-lg-12 mt-3">
        <SidebarFilter projectId={projectId} />
      </div>
      <div className="flex-grow-1"></div>
      <div className="col-4 col-lg-12">
        <SidebarSave />
      </div>
    </aside>
  );
}
