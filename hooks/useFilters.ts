import { useRouter } from "next/router"

export type FiltersState = {
  onlyStarred: boolean
}

export const useFilters = (): [FiltersState, (newFilters: FiltersState) => void] => {
  const router = useRouter()

  const { onlyStarred } = router.query

  const filters: FiltersState = { onlyStarred: onlyStarred === 'true' }
  const updateFilters = (newFilters: FiltersState) => {
    router.push({ query: { ...filters, ...newFilters } })
  }

  return [filters, updateFilters]
}
