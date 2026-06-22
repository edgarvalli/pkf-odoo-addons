import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

export function useFullScreen<T extends HTMLElement>(
  target: RefObject<T | null>,
  styles?: CSSProperties,
) {
  const [height, setHeight] = useState(0);

  const calcHeight = useCallback(() => {
    if (!target.current) return;

    const t = target.current;

    const heightCalc = window.innerHeight - t.getBoundingClientRect().top;

    t.style.height = `${heightCalc}px`;

    // aplicar estilos dinámicos
    if (styles) {
      Object.entries(styles).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          t.style.setProperty(
            key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`),
            String(value),
          );
        }
      });
    }

    setHeight(heightCalc);
  }, [target, styles]);

  useEffect(() => {
    calcHeight();

    window.addEventListener("resize", calcHeight);

    return () => {
      window.removeEventListener("resize", calcHeight);
    };
  }, [calcHeight]);

  return height;
}
