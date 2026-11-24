import GithubSlugger from 'github-slugger'

// Posts live as Markdown files in /content/posts.
// The file name becomes the URL: my-post.md -> /blog/my-post
export type Post = {
  slug: string
  title: string
  date: string // YYYY-MM-DD
  tags: string[]
  summary: string
  content: string // the Markdown body (everything below the --- block)
}

export type Heading = {
  id: string // used in the URL: #the-first-impression
  text: string
  depth: 2 | 3 // ## = 2, ### = 3
}

// Vite reads every .md file at build time and gives us its text.
const files = import.meta.glob('/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const posts: Post[] = Object.entries(files).map(([path, raw]) => {
  const slug = path.split('/').pop()!.replace(/\.md$/, '')
  const { data, content } = parseFrontmatter(raw)
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    tags: Array.isArray(data.tags) ? data.tags : [],
    summary: String(data.summary ?? ''),
    content,
  }
})

// Newest first.
export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

// "2026-11-20" -> "Nov 20, 2026"
export function formatDate(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Finds the ## and ### headings for the table of contents.
// The ids are made the same way rehype-slug makes them on the page,
// so the links point at the right place.
export function getHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger()
  const headings: Heading[] = []
  let inCodeBlock = false

  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCodeBlock = !inCodeBlock // a "# comment" inside code is not a heading
      continue
    }
    if (inCodeBlock) continue

    const match = line.trim().match(/^(#{1,6})\s+(.+?)\s*#*$/)
    if (!match) continue

    const text = match[2]
      .replace(/`([^`]*)`/g, '$1') // `code` -> code
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // [link](url) -> link
      .replace(/(\*\*|__|\*)/g, '') // **bold** -> bold
    const id = slugger.slug(text) // every heading gets a slug, so duplicates are numbered correctly
    const depth = match[1].length
    if (depth === 2 || depth === 3) headings.push({ id, text, depth })
  }
  return headings
}

// Reads the block between the --- lines at the top of a post:
//   title: My post
//   tags: [css, react]
function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {} as Record<string, string | string[]>, content: raw }

  const data: Record<string, string | string[]> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const value = line.slice(colon + 1).trim()
    data[key] =
      value.startsWith('[') && value.endsWith(']')
        ? value.slice(1, -1).split(',').map((v) => unquote(v.trim())).filter(Boolean)
        : unquote(value)
  }
  return { data, content: match[2] }
}

function unquote(value: string) {
  return value.replace(/^(["'])(.*)\1$/, '$2')
}
