export type StarProps = {
  filled?: boolean,
  onClick?: () => void
}

export const Star = ({ filled = false, onClick = () => { } }: StarProps) => {
  return (
    <button onClick={onClick}>{filled ? '★' : '☆'}</button>
  )
}
