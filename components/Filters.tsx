import { useFilters } from '../hooks/useFilters'

export type FiltersProps = {}

export const Filters = ({ }: FiltersProps) => {
  const [filters, updateFilters] = useFilters()

  return (
    <div>
      <button onClick={() => updateFilters({ onlyStarred: false })} disabled={!filters.onlyStarred}>Show all</button>
      {' '}
      <button onClick={() => updateFilters({ onlyStarred: true })} disabled={filters.onlyStarred}>Starred Only</button>
    </div>
  )
}
