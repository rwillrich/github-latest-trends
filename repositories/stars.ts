import { RepoId } from '../entities/repo'

const STORAGE_KEY = 'ghlt_starred'

export const getStarred = (): Promise<Set<RepoId>> => {
  const starredIdsData = localStorage.getItem(STORAGE_KEY)
  const starredIds: Set<RepoId> = new Set(starredIdsData ? JSON.parse(starredIdsData) : [])

  return Promise.resolve(starredIds)
}

export const updateStarred = async (id: RepoId, starred: boolean): Promise<Set<RepoId>> => {
  const starredIds = await getStarred()

  if (starred) {
    starredIds.add(id)
  } else {
    starredIds.delete(id)
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(starredIds)))

  return Promise.resolve(starredIds)
}

export const isStarred = async (id: RepoId): Promise<boolean> => {
  const starredIds = await getStarred()
  return starredIds.has(id)
}
