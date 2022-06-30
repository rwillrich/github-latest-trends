import styles from './RepoInfo.module.css'

import { Repo } from '../entities/repo'
import { Star } from './Star'

export type RepoInfoProps = {
  repo: Repo,
  onStarredChange?: (starred: boolean) => void
}

export const RepoInfo = ({ repo, onStarredChange = () => { } }: RepoInfoProps) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{repo.name}</h2>
      {repo.description && (
        <p>{repo.description}</p>
      )}
      <Star filled={repo.starred} className={styles.star} onClick={() => onStarredChange(!repo.starred)}>{repo.stars}</Star>
      <a title={`See '${repo.name}' details`} href={repo.link} target="_blank" rel="noreferrer">{repo.link}</a>
    </div>
  )
}
