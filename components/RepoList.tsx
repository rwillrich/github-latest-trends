import { useEffect, useMemo, useState } from 'react'

import { Repo } from '../entities/repo'
import { getStarred, updateStarred } from '../repositories/stars'

import { RepoInfo } from './RepoInfo'

export type RepoListProps = {
  items: Array<Repo>
}

export const RepoList = ({ items }: RepoListProps) => {
  const [starredRepoIds, setStarredRepoIds] = useState(new Set())
  useEffect(() => {
    getStarred().then(setStarredRepoIds)
  }, [])
  const repos = useMemo(() => {
    return items.map(repo => ({ ...repo, starred: starredRepoIds.has(repo.id) }))
  }, [items, starredRepoIds])



  return (
    <ul>
      {repos.map(repo => (
        <li key={repo.id}>
          <RepoInfo
            repo={repo}
            onStarredChange={(starred) => updateStarred(repo.id, starred).then(setStarredRepoIds)} />
        </li>
      ))}
    </ul>
  )
}
