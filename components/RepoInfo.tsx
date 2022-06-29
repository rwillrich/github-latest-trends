import { Repo } from '../entities/repo'

export type RepoInfoProps = {
  repo: Repo
}

export const RepoInfo = ({ repo }: RepoInfoProps) => {
  return (
    <div>
      <h2>{repo.name}</h2>
      {repo.description && (
        <p>{repo.description}</p>
      )}
      <p>Stars: {repo.stars}</p>
      <a title={`See '${repo.name}' details`} href={repo.link} target="_blank" rel="noopener">{repo.link}</a>
    </div>
  )
}
