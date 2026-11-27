import type { ReactNode } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Tag from '../../components/Tag'
import { books, now, type Book } from '../../about'
import { formatDate } from '../../posts'
// "?raw" tells Vite: give me this file's text as a plain string.
// (Blog posts are loaded the same way in src/posts.ts.)
import aboutText from '../../../content/about.md?raw'

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* ---------- Intro ---------- */}
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">About me</h1>

      {/* Same Markdown setup as a blog post: prose styles the text, prose-leaf colours it.
          prose keeps lines at a readable width (~65 characters) by itself. */}
      <div className="prose prose-leaf mt-6 md:prose-lg">
        <Markdown remarkPlugins={[remarkGfm]}>{aboutText}</Markdown>
      </div>

      {/* ------------ Resume ------------*/}
      <Section title="Resume">
        <a
          href="https://drive.google.com/file/d/19t3PJZYmzcKdqGVdG8LORsnhc02W_LoK/view?usp=share_link"
          download="Terretino.pdf"
          className="inline-block rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
        >
          Download Resume
        </a>
      </Section>

      {/* ---------- Now ---------- */}
      <Section title="What I'm doing now" subtitle={`Updated ${formatDate(now.updated)}`}>
        {/* Same two-column trick as the post list: a 7rem label column + the rest.
            Phones: label above text (flex-col). From 640px: side by side (sm:grid). */}
        <dl className="divide-y divide-line">
          {now.items.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 py-3 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-4">
              <dt className="font-mono text-sm text-muted">{item.label}</dt>
              <dd className="text-ink">{item.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ---------- Books ---------- */}
      <Section title="Books" subtitle={`${books.length} books I've read`}>
        {/* grid               -> lay the cards out in a grid
            sm:grid-cols-2     -> 1 column on phones, 2 from 640px
            gap-4              -> 1rem between cards */}
        <ul className="grid gap-4 sm:grid-cols-2">
          {books.map((book) => (
            <li key={book.slug}>
              <BookCard book={book} />
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}

// A reusable section: heading + optional subtitle + whatever you put inside.
// `children` is the content between <Section> and </Section>.
// Writing this once keeps all sections looking the same.
function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    // mt-16 -> big gap between sections (same as the home page)
    <section className="mt-16">
      {/* items-baseline -> title and subtitle sit on the same text line, even though they're different sizes */}
      <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-line pb-2">
        <h2 className="text-xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

// One book: the type on the LEFT, title/author/genre on the RIGHT.
function BookCard({ book }: { book: Book }) {
  return (
    // flex     -> left and right side by side
    // h-full   -> every card in a grid row is equally tall
    <article className="flex h-full gap-4 rounded-lg border border-line bg-surface p-4">
      {/* LEFT: the type, styled like a book spine.
          w-24 shrink-0  -> always 6rem wide, never squeezed
          text-center    -> 'Self Improvement' wraps onto two centred lines */}
      <div className="flex w-24 shrink-0 items-center justify-center rounded-md bg-leaf-soft p-2 text-center font-mono text-xs leading-snug text-leaf">
        {book.type}
      </div>

      {/* RIGHT: flex-col stacks title, author, genre vertically */}
      <div className="flex flex-col">
        <h3 className="font-semibold text-ink">{book.title}</h3>
        <p className="mt-0.5 text-sm text-muted">by {book.author}</p>
        {/* mt-auto -> takes all the free space above it, pushing the genre to the BOTTOM.
            The vertical version of ml-auto, your web "Spacer()". */}
        <div className="mt-auto pt-3">
          <Tag name={book.genre} />
        </div>
      </div>
    </article>
  )
}
