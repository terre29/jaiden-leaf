import { Link } from 'react-router'

type TagProps = {
  name: string
  to?: string // given -> the tag is a link (blog tags). Left out -> a plain label (book genres).
  active?: boolean // the tag currently being filtered by: drawn solid
  count?: number // optional number after the name, e.g. "#css 2"
}

// A small "pill" label, e.g. #react.
export default function Tag({ name, to, active = false, count }: TagProps) {
  const className = [
    // inline-flex items-center -> sits in a line of text, keeps "#css" and the count centred
    // rounded-full             -> fully rounded ends = pill shape
    // font-mono                -> monospace font, so tags look "code-like"
    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-xs transition-colors',
    active
      ? 'bg-leaf text-bg' // selected: solid green, like the main buttons
      : 'bg-leaf-soft text-leaf',
    // Only links react to the mouse. A plain label shouldn't look clickable.
    to && !active ? 'hover:bg-leaf/25' : '',
  ].join(' ')

  const content = (
    <>
      #{name}
      {/* count !== undefined -> show it even when it's 0 */}
      {count !== undefined && <span className="opacity-60">{count}</span>}
    </>
  )

  if (!to) return <span className={className}>{content}</span>

  return (
    // aria-current -> tells screen readers "this is the selected one" (NavLink does this for the menu)
    <Link to={to} className={className} aria-current={active ? 'true' : undefined}>
      {content}
    </Link>
  )
}
