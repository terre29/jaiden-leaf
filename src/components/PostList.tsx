import { Link } from 'react-router'
import { formatDate, type Post } from '../posts'
import Tag from './Tag'

// A list of posts. Reused on the home page (latest few) and the blog page (all).
export default function PostList({ posts }: { posts: Post[] }) {
  return (
    // divide-y divide-line -> draws a thin line BETWEEN each item (not above the first one)
    <ul className="divide-y divide-line">
      {posts.map((post) => (
        <li key={post.slug}>
          {/*
            "group" marks this link as a parent. Children can then use group-hover:
            to react when the mouse is anywhere over the whole row.

            Layout:
            flex flex-col          -> phone: date above title
            sm:grid                -> from 640px: switch to a grid...
            sm:grid-cols-[7rem_1fr]-> ...with a 7rem date column and the rest for the title
            -mx-3 px-3             -> padding for the hover background, pulled back out with a
                                      negative margin so text still lines up with the heading
          */}
          <Link
            to={`/blog/${post.slug}`}
            className="group -mx-3 flex flex-col gap-1 rounded-lg px-3 py-4 transition-colors hover:bg-surface sm:grid sm:grid-cols-[7rem_1fr] sm:gap-4"
          >
            {/* <time> is the proper HTML tag for dates. tabular-nums lines digits up. */}
            <time dateTime={post.date} className="font-mono text-sm tabular-nums text-muted sm:pt-0.5">
              {formatDate(post.date)}
            </time>

            <div>
              {/* group-hover:text-leaf -> title turns green when the ROW is hovered */}
              <h3 className="font-semibold text-ink transition-colors group-hover:text-leaf">
                {post.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{post.summary}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Tag key={tag} name={tag} />
                ))}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
