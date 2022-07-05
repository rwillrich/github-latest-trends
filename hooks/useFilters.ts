import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

export type SortOrder = 'desc' | 'asc'

export type FiltersState = {
  onlyStarred?: boolean,
  language?: string,
  sortOrder?: SortOrder
}

const toLanguage = (languageQueryParam: string | Array<string> | undefined) => {
  if (!languageQueryParam) return undefined

  const languageString = Array.isArray(languageQueryParam) ? languageQueryParam[0] : languageQueryParam

  return languageString === '' ? undefined : languageString
}

const toSortOrder = (sortOrderQueryParam: string | Array<string> | undefined) => {
  if (!sortOrderQueryParam) return 'desc'

  const sortOrderString = Array.isArray(sortOrderQueryParam) ? sortOrderQueryParam[0] : sortOrderQueryParam

  return (sortOrderString === 'desc' || sortOrderString === 'asc') ? sortOrderString : 'desc'
}

export const toFilters = (query: ParsedUrlQuery): FiltersState => {
  const {
    onlyStarred,
    language: languageQueryParam,
    sortOrder: sortOrderQueryParam
  } = query

  return {
    onlyStarred: onlyStarred === 'true',
    language: toLanguage(languageQueryParam),
    sortOrder: toSortOrder(sortOrderQueryParam)
  }
}

const pickTruthyProperties = <T>(obj: T) => Object.fromEntries(Object.entries(obj).filter(([, value]) => Boolean(value)))

export const useFilters = (): [FiltersState, (newFilters: FiltersState) => void] => {
  const router = useRouter()

  const filters = toFilters(router.query)

  const updateFilters = (newFilters: FiltersState) => {
    router.push({ query: pickTruthyProperties<FiltersState>({ ...filters, ...newFilters }) })
  }

  return [filters, updateFilters]
}
