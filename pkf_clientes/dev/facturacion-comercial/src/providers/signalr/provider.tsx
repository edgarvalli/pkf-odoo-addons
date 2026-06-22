import { useSignalR } from "./hooks";
import { createContext, type ReactNode } from "react";

export const SignalRContext = createContext<ReturnType<
  typeof useSignalR
> | null>(null);

export function SignalRProvider(props: { children?: ReactNode }) {
  const value = useSignalR();
  return (
    <SignalRContext.Provider value={value}>
      {props.children}
    </SignalRContext.Provider>
  );
}
