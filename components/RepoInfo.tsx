import { Repo } from '../entities/repo'
import { Star } from './Star'

export type RepoInfoProps = {
  repo: Repo,
  onStarredChange?: (starred: boolean) => void
}

export const RepoInfo = ({ repo, onStarredChange = () => { } }: RepoInfoProps) => {
  return (
    <div>
      <h2>{repo.name}</h2>
      {repo.description && (
        <p>{repo.description}</p>
      )}
      <p><Star filled={repo.starred} onClick={() => onStarredChange(!repo.starred)} /> {repo.stars}</p>
      <a title={`See '${repo.name}' details`} href={repo.link} target="_blank" rel="noopener">{repo.link}</a>
    </div>
  )
}
