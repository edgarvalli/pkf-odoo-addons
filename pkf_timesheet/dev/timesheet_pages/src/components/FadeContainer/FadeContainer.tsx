import { useEffect, useRef, type ReactNode } from "react";

export function FadeContainer(props: {
  children?: ReactNode;
  className?: string;
  duration?: number;
}) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    setTimeout(() => {
      targetRef.current?.classList.add("show");
    }, props.duration ?? 150);
  }, [targetRef, props.duration]);

  return (
    <div
      className={`fade ${props.className ? props.className : ""}`}
      ref={targetRef}
    >
      {props.children}
    </div>
  );
}
