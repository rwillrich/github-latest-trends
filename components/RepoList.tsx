import { Repo } from '../entities/repo'
import { useReposWithStarredData } from '../hooks/useReposWithStarredData'
import { useFilteredRepos } from '../hooks/useFilteredRepos'
import { useFilters } from '../hooks/useFilters'

import { RepoInfo } from './RepoInfo'

export type RepoListProps = {
  items: Array<Repo>
}

export const RepoList = ({ items }: RepoListProps) => {
  const [repos, updateStarred] = useReposWithStarredData(items)
  const [filters, updateFilters] = useFilters()
  const filteredRepos = useFilteredRepos(repos)

  return (
    <>
      <div>
        <button onClick={() => updateFilters({ onlyStarred: true })} disabled={filters.onlyStarred}>Starred Only</button>
        {' '}
        <button onClick={() => updateFilters({ onlyStarred: false })} disabled={!filters.onlyStarred}>Show all</button>
      </div>
      <ul>
        {filteredRepos.map(repo => (
          <li key={repo.id}>
            <RepoInfo
              repo={repo}
              onStarredChange={(starred) => updateStarred(repo.id, starred)} />
          </li>
        ))}
      </ul>
    </>
  )
}
