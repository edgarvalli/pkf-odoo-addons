import { useOrm } from "@/hooks/useOrm";
import {
  projectRepository as projectRepo,
  entryRepository as entryRepo,
} from "@/repositories";
import { useMemo } from "react";
export function useDependecies() {
  const orm = useOrm();
  const projectRepository = useMemo(() => projectRepo(orm), []);
  const entryRepository = useMemo(() => entryRepo(orm), []);
  return { orm, projectRepository, entryRepository };
}
