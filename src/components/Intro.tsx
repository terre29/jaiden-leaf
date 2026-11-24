import { Link } from 'react-router'
import { site } from '../site'

export default function Intro() {
  const { author } = site

  return (
    // RESPONSIVE LAYOUT (mobile-first):
    // flex-col          -> on phones: avatar on top, text below
    // md:flex-row       -> from 768px wide: side by side
    // md:items-center   -> on wide screens, centre them vertically
    // gap-8             -> 2rem space between avatar and text
    <section className="flex flex-col gap-8 md:flex-row md:items-center">
      {/* Avatar: a fixed-size circle.
          size-28          -> width and height 7rem
          shrink-0         -> never squash it when space is tight
          rounded-full     -> perfect circle
          ring-1 ring-line -> thin outline (doesn't take up layout space like a border would) */}
      <div className="flex size-28 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-6xl ring-1 ring-line">
        {author.avatar}
      </div>

      <div>
        {/* Small label above the heading: uppercase + wide letter spacing */}
        <p className="mb-2 font-mono text-xs text-leaf">
          Welcome
        </p>

        {/* Heading gets bigger on wider screens: text-3xl (phone) -> md:text-4xl */}
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Hey, I'm <span className="text-leaf">{author.name}</span> 👋
        </h1>

        {/* max-w-prose keeps lines ~65 characters long, the most readable width.
            leading-relaxed adds a bit more space between lines. */}
        <p className="mt-4 max-w-prose leading-relaxed text-muted">{author.bio}</p>

        {/* Two buttons: one solid (main action), one outlined (secondary). */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/blog"
            className="rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
          >
            Read the blog
          </Link>
          <Link
            to="/about"
            className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-leaf hover:text-leaf"
          >
            About me
          </Link>
        </div>
      </div>
    </section>
  )
}
