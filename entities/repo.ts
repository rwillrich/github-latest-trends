export type RepoId = number

export type Repo = {
  id: RepoId,
  name: string,
  description: string,
  link: string,
  stars: number,
  starred: boolean
}
