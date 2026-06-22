import type { ReactNode } from "react";

export function Body({ children }: { children?: ReactNode }) {
  return (
    <div
      className="container d-flex flex-column flex-grow-1 gap-3 bg-white shadow-sm pt-2"
      style={{ minHeight: 10 }}
    >
      {children}
    </div>
  );
}
