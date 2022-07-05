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
        value={filters.language || ''}
        onChange={(e) => updateFilters({ language: e.target.value != '' ? e.target.value : undefined })}>
        <option value="">All</option>
        {languages.map(language => (
          <option value={language} key={language}>{language}</option>
        ))}
      </select>
      {' '}
      <label htmlFor="sortOrder">Sort:</label>
      {' '}
      {filters.sortOrder === 'asc' && (
        <button id='sortOrder' onClick={() => { updateFilters({ sortOrder: 'desc' }) }}>Desc</button>
      )}
      {filters.sortOrder === 'desc' && (
        <button id='sortOrder' onClick={() => { updateFilters({ sortOrder: 'asc' }) }}>Asc</button>
      )}
    </p>
  )
}
