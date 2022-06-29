export type Paginated<T> = {
  items: Array<T>,
  page: number,
  perPage: number,
  total: number
}
