import { useFullHeight } from "@/hooks/useFullHeight";
import type { ReactNode } from "react";

export function AppContainer(props: { children: ReactNode }) {
  const { targetRef } = useFullHeight();
  return <div ref={targetRef}>{props.children}</div>;
}
