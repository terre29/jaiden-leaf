import { Link } from 'react-router'

type EmptyStateProps = {
  emoji: string
  title: string
  message: string
  action?: { label: string; to: string } // optional link, e.g. "Show all posts"
}

// What to show when a list has nothing in it: says WHY it's empty,
// and (optionally) offers a way forward, instead of leaving a blank space.
// Used on the blog page (no posts yet / no search results) and the home page.
export default function EmptyState({ emoji, title, message, action }: EmptyStateProps) {
  return (
    // border-dashed -> a dashed outline reads as "a space waiting to be filled"
    <div className="rounded-lg border border-dashed border-line px-6 py-12 text-center">
      {/* aria-hidden: the emoji is decoration, the title says it all */}
      <p className="text-4xl" aria-hidden="true">
        {emoji}
      </p>
      <p className="mt-3 text-lg font-semibold">{title}</p>
      {/* max-w-sm mx-auto -> keeps the message to a few short lines, centred */}
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{message}</p>
      {action && (
        <Link to={action.to} className="mt-4 inline-block text-sm text-leaf hover:underline">
          {action.label}
        </Link>
      )}
    </div>
  )
}
