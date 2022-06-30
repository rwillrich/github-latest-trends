import { format, subDays } from 'date-fns'
import { GithubRepo, GithubResult, toPaginated, toRepo } from '../entities/github'

import { base, createFetch, FetchFN, parseJson } from '../lib/composable-fetch'
import { Repo, RepoId } from '../entities/repo'
import { Paginated } from '../entities/paginated'

const fetchRepos = createFetch(
  base('https://api.github.com/search/repositories'),
  parseJson()
)

type GetLatestTrendsParams = {
  page?: number,
  perPage?: number,
  language?: string
}

export const getLatestTrends = (
  {
    page = 1,
    perPage = 20,
    language
  }: GetLatestTrendsParams = {},
  fetch: FetchFN<GithubResult<GithubRepo>> = fetchRepos
): Promise<Paginated<Repo>> => {
  const createdParam = [`created:${format(subDays(new Date(), 7), '>=yyyy-MM-dd')}`]
  const languageParam = language ? [`language:${language}`] : []
  const qParam = [createdParam, languageParam].flat().join('+')

  return fetch(`?q=${qParam}&sort=stars&order=desc`)
    .then(toPaginated<GithubRepo, Repo>(page, perPage, toRepo))
}
