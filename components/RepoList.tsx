import styles from './RepoList.module.css'

import { Repo } from '../entities/repo'
import { useReposWithStarredData } from '../hooks/useReposWithStarredData'
import { useFilteredRepos } from '../hooks/useFilteredRepos'
import { useLanguages } from '../hooks/useLanguages'

import { RepoInfo } from './RepoInfo'
import { Filters } from './Filters'

export type RepoListProps = {
  items: Array<Repo>
}

export const RepoList = ({ items }: RepoListProps) => {
  const [repos, updateStarred] = useReposWithStarredData(items)
  const filteredRepos = useFilteredRepos(repos)
  const languages = useLanguages(filteredRepos)

  return (
    <>
      <Filters languages={languages} />
      <ul className={styles.list}>
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
