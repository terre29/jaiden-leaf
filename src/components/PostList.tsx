import { Link } from 'react-router'
import { formatDate, tagUrl, type Post } from '../posts'
import Tag from './Tag'

type PostListProps = {
  posts: Post[]
  activeTag?: string // the tag being filtered by on the blog page, highlighted in each row
}

// A list of posts. Reused on the home page (latest few) and the blog page (all or filtered).
export default function PostList({ posts, activeTag }: PostListProps) {
  return (
    // divide-y divide-line -> draws a thin line BETWEEN each item (not above the first one)
    <ul className="divide-y divide-line">
      {posts.map((post) => (
        <li key={post.slug}>
          {/*
            THE "STRETCHED LINK" TRICK
            The whole row should open the post, but the tags inside it are links too,
            and a link can't contain another link. So:
              1. Only the TITLE is a real link (below).
              2. Its ::after (an invisible box CSS adds to it) is stretched over the whole row,
                 so clicking anywhere on the row clicks the title link.
              3. The tags get `relative z-10` to sit ON TOP of that box, so they catch their own clicks.

            relative               -> the stretched box fills THIS element, not the whole page
            group                  -> children can use group-hover: (title turns green on row hover)
            flex flex-col          -> phone: date above title
            sm:grid sm:grid-cols-[7rem_1fr] -> from 640px: a 7rem date column + the rest
            -mx-3 px-3             -> padding for the hover background, pulled back out with a
                                      negative margin so text still lines up with the heading
          */}
          <article className="group relative -mx-3 flex flex-col gap-1 rounded-lg px-3 py-4 transition-colors hover:bg-surface sm:grid sm:grid-cols-[7rem_1fr] sm:gap-4">
            {/* <time> is the proper HTML tag for dates. tabular-nums lines digits up. */}
            <time dateTime={post.date} className="font-mono text-sm tabular-nums text-muted sm:pt-0.5">
              {formatDate(post.date)}
            </time>

            <div>
              <h3 className="font-semibold text-ink transition-colors group-hover:text-leaf">
                {/*
                  after:absolute after:inset-0 -> the ::after box covers the whole <article>
                  after:rounded-lg             -> same corners as the row
                  focus-visible:after:...      -> keyboard users see the WHOLE row outlined when
                                                  they Tab to it, not just the title
                */}
                <Link
                  to={`/blog/${post.slug}`}
                  className="outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-leaf"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-muted">{post.summary}</p>

              {/* relative z-10 -> above the stretched link, so tags stay clickable
                  w-fit         -> only as wide as the tags: the empty space beside them
                                   still belongs to the row and opens the post */}
              <div className="relative z-10 mt-2 flex w-fit flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Tag key={tag} name={tag} to={tagUrl(tag)} active={tag.toLowerCase() === activeTag} />
                ))}
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}
