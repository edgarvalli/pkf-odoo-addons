import { useEffect, useRef } from "react";

export function useFullHeight() {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const setFullHeight = () => {
    if (!targetRef.current) return;
    const rec = targetRef.current.getBoundingClientRect();
    targetRef.current.style.height = `${window.innerHeight - rec.top}px`;
  };

  useEffect(() => {
    setFullHeight();
    window.addEventListener("resize", setFullHeight);
    return () => window.removeEventListener("resize", setFullHeight);
  }, [setFullHeight]);

  return { targetRef };
}
