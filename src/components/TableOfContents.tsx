import type { Heading } from '../posts'

type Props = {
  headings: Heading[]
  activeId: string | null
}

// The list of section links ("bookmarks").
export default function TableOfContents({ headings, activeId }: Props) {
  return (
    // border-l border-line -> one thin vertical line on the left of the whole list
    <ul className="space-y-1 border-l border-line text-sm">
      {headings.map((heading) => {
        const isActive = heading.id === activeId
        return (
          <li key={heading.id}>
            {/*
              href="#some-id" scrolls to the element with that id: the browser does this for us.
              -ml-px border-l-2 -> a 2px line sitting exactly on top of the list's 1px line.
                                   Transparent normally, green when active.
              pl-6 for ### headings -> indented one level deeper
            */}
            <a
              href={`#${heading.id}`}
              className={[
                '-ml-px block border-l-2 py-1 transition-colors',
                heading.depth === 3 ? 'pl-6' : 'pl-3',
                isActive
                  ? 'border-leaf font-semibold text-leaf'
                  : 'border-transparent text-muted hover:border-muted hover:text-ink',
              ].join(' ')}
            >
              {heading.text}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
