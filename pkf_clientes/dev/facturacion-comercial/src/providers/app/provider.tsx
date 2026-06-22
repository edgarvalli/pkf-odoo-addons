import { useAppProvider } from "./hooks";
import { createContext, type ReactNode } from "react";

export const AppContext = createContext<ParamsType | null>(null);

export function AppProvider(props: { children?: ReactNode }) {
  const value = useAppProvider();
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
