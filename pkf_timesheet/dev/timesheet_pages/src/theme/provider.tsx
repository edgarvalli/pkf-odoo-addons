import { useCallback, type ReactNode } from "react";

export function AppProvider({ children }: { children: ReactNode }) {
  const setHeightRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const rec = node.getBoundingClientRect();
    node.style.height = `${window.innerHeight - rec.top}px`;
    node.style.overflowY = "auto";
  }, []);
  return (
    <div
      ref={setHeightRef}
      className="d-flex flex-column"
      style={{ width: "100wv", overflow: "hidden" }}
    >
      {children}
    </div>
  );
}
