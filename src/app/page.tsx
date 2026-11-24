import { Link } from 'react-router'
import Intro from '../components/Intro'
import PostList from '../components/PostList'
import { sortedPosts } from '../posts'

// Home page: built by stacking components.
export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl">
      <Intro />
      {/* mt-16 -> big gap between sections so each one has room to breathe */}
      <section className="mt-16">
        {/* Section header: title on the left, "View all" on the right */}
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-xl font-bold">Latest posts</h2>
          <Link to="/blog" className="text-sm text-muted hover:text-leaf">
            View all →
          </Link>
        </div>

        {/* .slice(0, 4) -> only the 4 newest posts */}
        <PostList posts={sortedPosts.slice(0, 4)} />
      </section>
    </div>
  )
}
