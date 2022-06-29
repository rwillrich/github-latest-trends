import { useEffect, useMemo, useState } from 'react'

import { Repo, RepoId } from '../entities/repo'
import * as stars from '../repositories/stars'

import { RepoInfo } from './RepoInfo'

export type RepoListProps = {
  items: Array<Repo>
}

const useReposWithStarredData = (items: Array<Repo>): [Array<Repo>, (repoId: RepoId, starred: boolean) => Promise<void>] => {
  const [starredRepoIds, setStarredRepoIds] = useState<Set<RepoId>>(new Set())
  useEffect(() => {
    stars.getStarred().then(setStarredRepoIds)
  }, [])
  const repos = useMemo<Array<Repo>>(() => {
    return items.map(repo => ({ ...repo, starred: starredRepoIds.has(repo.id) }))
  }, [items, starredRepoIds])
  const updateStarred = (repoId: RepoId, starred: boolean) => stars.updateStarred(repoId, starred).then(setStarredRepoIds)

  return [repos, updateStarred]
}

export const RepoList = ({ items }: RepoListProps) => {
  const [repos, updateStarred] = useReposWithStarredData(items)

  return (
    <ul>
      {repos.map(repo => (
        <li key={repo.id}>
          <RepoInfo
            repo={repo}
            onStarredChange={(starred) => updateStarred(repo.id, starred)} />
        </li>
      ))}
    </ul>
  )
}
