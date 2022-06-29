import { format, subDays } from 'date-fns'
import { GithubRepo, GithubResult, toPaginated, toRepo } from '../entities/github'

import { base, createFetch, FetchFN, parseJson } from '../lib/composable-fetch'
import { Repo } from '../entities/repo'
import { Paginated } from '../entities/paginated'

const fetchRepos = createFetch(
  base('https://api.github.com/search/repositories'),
  parseJson()
)

export const getLatestTrends = (
  { page = 1, perPage = 20 }: { page?: number, perPage?: number } = {},
  fetch: FetchFN<GithubResult<GithubRepo>> = fetchRepos
): Promise<Paginated<Repo>> => {
  return fetch(`?q=created:${format(subDays(new Date(), 7), '>yyyy-MM-dd')}&sort=stars&order=desc`)
    .then(toPaginated<GithubRepo, Repo>(page, perPage, toRepo))
}
