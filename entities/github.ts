import { Repo } from '../entities/repo'
import { Paginated } from './paginated'

export type GithubRepo = {
  id: number,
  name: string,
  description: string,
  html_url: string,
  stargazers_count: number
}

export type GithubResult<T> = {
  items: Array<T>,
  total_count: number
}

export const toRepo = (item: GithubRepo): Repo => {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    link: item.html_url,
    stars: item.stargazers_count,
    starred: false
  }
}

export const toPaginated = <SourceItem, TargetItem>(page: number, perPage: number, toItem: (item: SourceItem) => TargetItem) =>
  (result: GithubResult<SourceItem>): Paginated<TargetItem> => {
    return {
      items: result.items.map(toItem),
      page,
      perPage,
      total: result.total_count
    }
  }
