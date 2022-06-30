import cx from 'classnames'

import styles from './Star.module.css'

export type StarProps = {
  filled?: boolean,
  children?: React.ReactNode
  className?: string,
  onClick?: () => void
}

export const Star = ({
  filled = false,
  children,
  className,
  onClick = () => { }
}: StarProps) => {
  return (
    <button
      className={cx(
        styles.button,
        className
      )}
      onClick={onClick}>
      <span
        className={cx(
          styles.icon,
          { [styles.filled]: filled }
        )}>
        {filled ? '★' : '☆'}
      </span>
      <span>{children}</span>
    </button>
  )
}
