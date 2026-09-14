import { useCallback, useEffect, useRef, type ReactNode } from "react";

type AppProviderProps = { children: ReactNode; className?: string };

export function AppProvider({ children, className }: AppProviderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setFullHeight = useCallback(() => {
    if (!containerRef.current) return;
    const rec = containerRef.current.getBoundingClientRect();
    containerRef.current.style.height = `${window.innerHeight - rec.top}px`;
  }, []);

  useEffect(() => {
    setFullHeight();
    window.addEventListener("resize", setFullHeight);
    return () => window.removeEventListener("resize", setFullHeight);
  }, [setFullHeight]);

  return (
    <div ref={containerRef} className="d-flex flex-column">
      {/* 👇 este div debe crecer y permitir scroll */}
      <div
        className={`${className} flex-grow-1 overflow-auto`}
        style={{ minHeight: 0 }}
      >
        {children}
      </div>
    </div>
  );
}
