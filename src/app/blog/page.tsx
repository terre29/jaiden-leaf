import PostList from '../../components/PostList'
import { sortedPosts } from '../../posts'

// Same PostList component as the home page, just given ALL the posts.
export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted">
        {sortedPosts.length} posts about code, design and learning.
      </p>
      <div className="mt-8">
        <PostList posts={sortedPosts} />
      </div>
    </div>
  )
}
