import { useContext } from "react";
import { AppContext } from "@/app/context";

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be inside AppProvider");
  return ctx;
}
