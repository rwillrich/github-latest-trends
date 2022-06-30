import { useFilters } from '../hooks/useFilters'

export type FiltersProps = {
  languages: Array<string>
}

export const Filters = ({ languages = [] }: FiltersProps) => {
  const [filters, updateFilters] = useFilters()

  return (
    <p>
      Filters:
      {' '}
      <button onClick={() => updateFilters({ onlyStarred: false })} disabled={!filters.onlyStarred}>Show all</button>
      {' '}
      <button onClick={() => updateFilters({ onlyStarred: true })} disabled={filters.onlyStarred}>Starred Only</button>
      {' '}
      <select
        name="language"
        id="Filters-language"
        onChange={(e) => updateFilters({ languages: e.target.value === '' ? [] : [e.target.value] })}>
        <option value="">All</option>
        {languages.map(language => (
          <option value={language} key={language}>{language}</option>
        ))}
      </select>
    </p>
  )
}
