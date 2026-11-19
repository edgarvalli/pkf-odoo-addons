import { createContext } from "react";
import { useOrm } from "@/hooks/useOrm";

import type { IAppContext } from "@/app/types";

export const AppContext = createContext<IAppContext | null>(null);

export function useCreateContext() {
  const orm = useOrm();

  return { orm };
}
