import { useMemo, useState } from 'react'

import { Repo } from '../entities/repo'

export type FiltersState = {
  onlyStarred: boolean
}

export const useFilteredRepos = (items: Array<Repo>): [Array<Repo>, (updatedFilters: FiltersState) => void] => {
  const [filters, setFilters] = useState<FiltersState>({ onlyStarred: false })
  const filteredRepos = useMemo<Array<Repo>>(() => {
    return items.filter(repo => filters.onlyStarred ? repo.starred : true)
  }, [filters, items])
  const updateFilters = (updatedFilters: FiltersState) => {
    setFilters(filters => ({ ...filters, ...updatedFilters }))
  }

  return [filteredRepos, updateFilters]
}
