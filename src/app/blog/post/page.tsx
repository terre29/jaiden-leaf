import Markdown from 'react-markdown'
import { Link, useParams } from 'react-router'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import Tag from '../../../components/Tag'
import TableOfContents from '../../../components/TableOfContents'
import { useActiveHeading } from '../../../hooks/useActiveHeading'
import { formatDate, getHeadings, sortedPosts } from '../../../posts'

export default function PostPage() {
  // The :slug part of the URL, e.g. /blog/learning-tailwind-css -> "learning-tailwind-css"
  const { slug } = useParams()
  const post = sortedPosts.find((p) => p.slug === slug)

  const headings = post ? getHeadings(post.content) : []
  const activeId = useActiveHeading(headings.map((h) => h.id))

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold">Post not found 🍂</h1>
        <Link to="/blog" className="mt-4 inline-block text-leaf hover:underline">
          ← Back to the blog
        </Link>
      </div>
    )
  }

  return (
    /*
      TWO-COLUMN LAYOUT (only on large screens):
      xl:grid                          -> turn on grid from 1024px wide
      xl:grid-cols-[minmax(0,1fr)_13rem] -> article takes the rest, sidebar is 13rem
                                          (minmax(0,1fr) stops wide code blocks from stretching the column)
      xl:gap-12                        -> 3rem between them
    */
    <div className="mx-auto max-w-5xl xl:grid xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-12">
      <article>
        {/* ---------- Post header ---------- */}
        <Link to="/blog" className="text-sm text-muted hover:text-leaf">
          ← All posts
        </Link>

        <header className="mt-6 border-b border-line pb-8">
          <time dateTime={post.date} className="text-sm text-muted">
            {formatDate(post.date)}
          </time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance md:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        </header>

        {/* ---------- Table of contents for PHONES ----------
            lg:hidden -> only shown below 1024px. <details> is a built-in
            HTML element that opens and closes when you tap its <summary>. */}
        {headings.length > 0 && (
          <details className="mt-8 rounded-lg border border-line bg-surface p-4 xl:hidden">
            <summary className="cursor-pointer font-semibold">On this page</summary>
            <div className="mt-4">
              <TableOfContents headings={headings} activeId={activeId} />
            </div>
          </details>
        )}

        {/* ---------- The Markdown content ----------
            prose            -> typography plugin styles everything inside
            prose-leaf       -> our colours (defined in index.css)
            md:prose-lg      -> slightly bigger text on wider screens
            max-w-none       -> let the grid decide the width, not prose
            prose-headings:scroll-mt-24 -> when jumping to a heading, stop 6rem below
                                           the top so the sticky header doesn't cover it */}
        <div className="prose prose-leaf mt-8 max-w-none md:prose-lg prose-headings:scroll-mt-24 prose-a:no-underline hover:prose-a:underline">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
            {post.content}
          </Markdown>
        </div>

        <footer className="mt-16 border-t border-line pt-8">
          <Link to="/blog" className="text-sm text-muted hover:text-leaf">
            ← Back to all posts
          </Link>
        </footer>
      </article>

      {/* ---------- Table of contents for DESKTOP ----------
          hidden lg:block -> hidden on phones, shown from 1024px
          sticky top-24   -> stays in view while you scroll (6rem from the top, below the header) */}
      {headings.length > 0 && (
        <aside className="hidden xl:block">
          <nav className="sticky top-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              On this page
            </p>
            <TableOfContents headings={headings} activeId={activeId} />
          </nav>
        </aside>
      )}
    </div>
  )
}
