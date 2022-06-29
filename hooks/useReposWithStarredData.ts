import { useEffect, useMemo, useState } from 'react'

import { Repo, RepoId } from '../entities/repo'
import * as stars from '../repositories/stars'

export const useReposWithStarredData = (items: Array<Repo>): [Array<Repo>, (repoId: RepoId, starred: boolean) => Promise<void>] => {
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
