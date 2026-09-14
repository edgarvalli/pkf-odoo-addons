import { useEffect, useRef, type ReactNode } from "react";

type FadeTransitionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeTransition(props: FadeTransitionProps) {
  const { className, children, delay } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (!containerRef.current) return;
      containerRef.current.classList.add("show");
    }, delay ?? 120);
  }, [containerRef]);

  return (
    <div className={`fade ${className ? className : ""}`} ref={containerRef}>
      {children}
    </div>
  );
}
