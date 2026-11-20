import { useState } from "react";
import { RouterMenuList } from "./RouterMenuList";

import { useRouterMenu } from "./hooks";

export function RouterMenu() {
  const { menuOptions, navigate, isCurrentOption } = useRouterMenu();
  const [open, setOpen] = useState(false);

  const handleNavigate = (url: string) => {
    navigate(url);
    setOpen(false);
  };

  return (
    <>
      {/* Menú móvil */}
      <div className="router-menu-mobile">
        <div className="router-menu-mobile-header">
          <span>Menú</span>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
          >
            <i className={`fa ${open ? "fa-times" : "fa-bars"}`} />
          </button>
        </div>

        {open && (
          <RouterMenuList
            menuOptions={menuOptions}
            isActive={isCurrentOption}
            onItemClicked={handleNavigate}
          />
        )}
      </div>

      {/* Menú lateral */}
      <aside className="router-menu-sidebar">
        <RouterMenuList
          menuOptions={menuOptions}
          isActive={isCurrentOption}
          onItemClicked={handleNavigate}
        />
      </aside>

      {/* Menú superior de escritorio */}
      <aside className="router-menu-desktop">
        <RouterMenuList
          menuOptions={menuOptions}
          isActive={isCurrentOption}
          onItemClicked={handleNavigate}
        />
      </aside>
    </>
  );
}
