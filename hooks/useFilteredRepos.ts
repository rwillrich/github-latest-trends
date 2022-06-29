import { useMemo } from 'react'

import { Repo } from '../entities/repo'

import { useFilters } from './useFilters'

export const useFilteredRepos = (items: Array<Repo>): Array<Repo> => {
  const [filters] = useFilters()
  const filteredRepos = useMemo<Array<Repo>>(() => {
    return items.filter(repo => filters.onlyStarred ? repo.starred : true)
  }, [filters, items])

  return filteredRepos
}
