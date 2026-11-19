import { useOrm } from "@/hooks/useOrm";

export type Orm = ReturnType<typeof useOrm>;
export interface IAppContext {
  orm: Orm;
}
