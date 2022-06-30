import { useRouter } from 'next/router'

export type FiltersState = {
  onlyStarred?: boolean,
  languages?: Array<string>
}

const pickTruthyProperties = <T>(obj: T) => Object.fromEntries(Object.entries(obj).filter(([, value]) => value != false))

export const useFilters = (): [FiltersState, (newFilters: FiltersState) => void] => {
  const router = useRouter()

  const { onlyStarred, languages } = router.query

  const filters: FiltersState = {
    onlyStarred: onlyStarred === 'true',
    languages: typeof languages === 'string' ? [languages] : languages
  }
  const updateFilters = (newFilters: FiltersState) => {
    router.push({ query: pickTruthyProperties<FiltersState>({ ...filters, ...newFilters }) })
  }

  return [filters, updateFilters]
}
