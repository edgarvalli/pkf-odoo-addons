import { AppContext, useCreateContext } from "./context";
import { AppContainer } from "./AppContainer";
import type { ReactNode } from "react";

export function AppProvider(props: { children?: ReactNode }) {
  const value = useCreateContext();
  return (
    <AppContext.Provider value={value}>
      <AppContainer>{props.children}</AppContainer>
    </AppContext.Provider>
  );
}
