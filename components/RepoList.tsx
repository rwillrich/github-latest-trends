import { Repo } from '../entities/repo'

import { RepoInfo } from './RepoInfo'

export type RepoListProps = {
  items: Array<Repo>
}

export const RepoList = ({ items }: RepoListProps) => {
  return (
    <ul>
      {items.map(repo => (
        <li key={repo.id}>
          <RepoInfo repo={repo} />
        </li>
      ))}
    </ul>
  )
}
