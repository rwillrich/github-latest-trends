import { useRouter } from 'next/router'

export type FiltersState = {
  onlyStarred?: boolean,
  language?: string,
  sortOrder?: 'asc' | 'desc'
}

const pickTruthyProperties = <T>(obj: T) => Object.fromEntries(Object.entries(obj).filter(([, value]) => value != false))

export const useFilters = (): [FiltersState, (newFilters: FiltersState) => void] => {
  const router = useRouter()

  const { onlyStarred, language, sortOrder } = router.query

  const filters: FiltersState = {
    onlyStarred: onlyStarred === 'true',
    language: Array.isArray(language) ? language[0] : language,
    sortOrder: sortOrder as ('asc' | 'desc') || 'desc'
  }
  const updateFilters = (newFilters: FiltersState) => {
    router.push({ query: pickTruthyProperties<FiltersState>({ ...filters, ...newFilters }) })
  }

  return [filters, updateFilters]
}
