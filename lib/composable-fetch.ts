export type FetchFN<Result> = <T = Result>(input: URL | RequestInfo, init?: RequestInit) => Promise<T>
export type Middleware<Source, Target> = (fetch: FetchFN<Source>) => FetchFN<Target>

export const base = (base: string | URL): Middleware<Response, Response> =>
  fetch => (input, init) => fetch(new URL(input as (string | URL), base), init)
export const parseJson = <Result>(): Middleware<Response, Result> =>
  fetch => (input, init) => fetch<Response>(input, init).then(result => result.json())

export const createFetch = (...middleware: Array<Middleware<unknown, unknown>>): FetchFN<unknown> =>
  middleware.reduceRight((fetch, middleware) => middleware(fetch), fetch as FetchFN<Response>)
