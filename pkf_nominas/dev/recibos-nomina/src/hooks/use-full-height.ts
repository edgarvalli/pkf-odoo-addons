import { useEffect, useState, type RefObject } from "react";

export function useFullHeight<T = HTMLDivElement | null>(target: RefObject<T>) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!target) return;
    const el = target.current as HTMLElement;
    const totalHeight = window.innerHeight;
    const currentPoint = el.getBoundingClientRect();

    const h = totalHeight - currentPoint.top;
    setHeight(h);
    el.style.height = `${h}px`;
  }, []);

  return height;
}
