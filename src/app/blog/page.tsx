import { Link, useSearchParams } from 'react-router'
import EmptyState from '../../components/EmptyState'
import PostList from '../../components/PostList'
import Tag from '../../components/Tag'
import { filterPosts, getTopTags, sortedPosts } from '../../posts'

// Worked out once, when the site loads: the posts don't change while someone is browsing.
const topTags = getTopTags(sortedPosts, 5)

export default function BlogPage() {
  /*
    THE SEARCH LIVES IN THE URL:  /blog?tag=css&q=tailwind
    useSearchParams is like useState, but the value is the part after "?" in the address.
    So the back button, refreshing, and sharing a link all keep the current search.
  */
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? '' // ?? '' -> "no q in the URL" becomes an empty search
  const activeTag = (searchParams.get('tag') ?? '').toLowerCase()

  const results = filterPosts(sortedPosts, { tag: activeTag, query })
  const isFiltering = activeTag !== '' || query.trim() !== ''

  // Typing in the search box: update ?q= and keep ?tag= as it is.
  function setQuery(value: string) {
    const next = new URLSearchParams(searchParams) // a copy, so the current one isn't changed
    if (value) next.set('q', value)
    else next.delete('q') // empty box -> remove ?q= entirely, keeps the URL clean
    // replace: true -> update the address WITHOUT adding a back-button step for every letter typed
    setSearchParams(next, { replace: true })
  }

  // Where clicking a tag in the tag row goes: select it, or clear it if it's already selected.
  // The search text (?q=) is kept either way.
  function tagLink(name: string) {
    const next = new URLSearchParams(searchParams)
    if (name === activeTag) next.delete('tag')
    else next.set('tag', name)
    const rest = next.toString()
    return rest ? `/blog?${rest}` : '/blog'
  }

  // The 5 top tags, plus the selected tag if it isn't one of them
  // (e.g. someone clicked a rare tag on a post page). Otherwise you couldn't see what's selected.
  const shownTags =
    activeTag && !topTags.some((t) => t.name === activeTag)
      ? [...topTags, { name: activeTag, count: undefined }]
      : topTags

  // No posts written yet: a search bar and tags would have nothing to work on,
  // so show only a friendly message. Returning early = the rest of the page isn't drawn.
  // (Like `guard !posts.isEmpty else { return EmptyView }` in Swift.)
  if (sortedPosts.length === 0) {
    return (
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <div className="mt-8">
          <EmptyState
            emoji="🌱"
            title="No posts yet"
            message="The first one is still growing. Check back soon!"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted">
        {/* 1 post / 2 posts: the word follows the number */}
        {sortedPosts.length} {sortedPosts.length === 1 ? 'post' : 'posts'}.
      </p>

      {/* ---------- Search bar ---------- */}
      <div className="relative mt-8">
        {/*
          sr-only -> visible to screen readers only. Every input needs a label;
                     the placeholder text isn't one (it disappears as soon as you type).
        */}
        <label htmlFor="blog-search" className="sr-only">
          Search posts
        </label>

        {/* Magnifying glass inside the box, on the left.
            pointer-events-none -> clicks go through it to the input underneath */}
        <SearchIcon />

        {/*
          type="search"   -> phones show a "Search" key on the keyboard
          value + onChange -> the box shows what's in the URL, and typing updates the URL
          pl-10            -> room on the left for the icon
          pr-10            -> room on the right for the clear button
          [&::-webkit-search-cancel-button]:hidden -> Safari/Chrome add their own ✕ to search
                             boxes. We hide it, since we draw our own (same look in every browser).
          focus:border-leaf -> the box turns green while you're typing in it
        */}
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          autoComplete="off"
          className="w-full rounded-lg border border-line bg-surface py-2.5 pl-10 pr-10 text-ink outline-none transition-colors placeholder:text-muted focus:border-leaf [&::-webkit-search-cancel-button]:hidden"
        />

        {/* Clear button: only while there's something typed */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted hover:bg-bg hover:text-ink"
          >
            <ClearIcon />
          </button>
        )}
      </div>

      {/* ---------- Top tags ---------- */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm text-muted">Popular:</span>
        {shownTags.map((tag) => (
          <Tag
            key={tag.name}
            name={tag.name}
            count={tag.count}
            to={tagLink(tag.name)}
            active={tag.name === activeTag}
          />
        ))}
      </div>

      {/* ---------- What's being shown ---------- */}
      {isFiltering && (
        // aria-live="polite" -> screen readers announce the new count when results change
        <div className="mt-8 flex items-baseline justify-between gap-4" aria-live="polite">
          <p className="text-sm text-muted">
            {results.length} {results.length === 1 ? 'post' : 'posts'}
            {activeTag && (
              <>
                {' '}tagged <span className="font-mono text-leaf">#{activeTag}</span>
              </>
            )}
            {query.trim() && (
              <>
                {' '}matching <span className="text-ink">“{query.trim()}”</span>
              </>
            )}
          </p>
          {/* /blog with nothing after it = no tag, no search */}
          <Link to="/blog" className="shrink-0 text-sm text-muted hover:text-leaf">
            Clear all
          </Link>
        </div>
      )}

      {/* ---------- The posts ---------- */}
      <div className={isFiltering ? 'mt-2' : 'mt-8'}>
        {results.length > 0 ? (
          <PostList posts={results} activeTag={activeTag} />
        ) : (
          // Posts exist, but none match the search/tag: say so and offer a way back
          <EmptyState
            emoji="🍂"
            title="No posts found"
            message="Try a different word, or another tag."
            action={{ label: 'Show all posts', to: '/blog' }}
          />
        )}
      </div>
    </div>
  )
}

// Lucide "search", positioned inside the search box.
// absolute left-3 top-1/2 -translate-y-1/2 -> 0.75rem from the left, centred vertically
function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

// Lucide "x"
function ClearIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
