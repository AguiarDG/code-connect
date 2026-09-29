type DividerProps = {
  children: string
}

function Divider({ children }: DividerProps) {
  return (
    <div className="flex items-center gap-4 text-text">
      <span aria-hidden="true" className="h-px flex-1 bg-muted" />
      <span className="shrink-0">{children}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-muted" />
    </div>
  )
}

export default Divider
