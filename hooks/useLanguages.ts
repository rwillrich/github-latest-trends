import { useMemo } from "react";

import { Repo } from "../entities/repo";

export const useLanguages = (items: Array<Repo>) => {
  const languages = useMemo(() => {
    return Array.from(new Set(items.flatMap(repo => repo.languages))).sort()
  }, [items])

  return languages
}
