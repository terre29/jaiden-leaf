// Everything listed on the About page (the intro text lives in content/about.md).
// Edit the lists here; the page updates by itself.

// ---------- Now ----------
// What you're up to at the moment. Change `updated` whenever you edit the items,
// so visitors know how fresh it is.
export const now = {
  updated: '2026-11-24', // YYYY-MM-DD
  items: [
    // TODO: replace these with your own
    { label: 'Working on', text: 'iOS apps at my day job.' },
    { label: 'Learning', text: 'Web development: React, TypeScript and Tailwind, by building this site.' },
    { label: 'Reading', text: 'Atomic Habits by James Clear.' },
    { label: 'Playing', text: 'Genshin Impact & Crusader Kings III' }
  ],
}

// ---------- Books ----------
// The allowed book types. Writing them as a list of exact words (a "union type")
// means TypeScript underlines a typo like 'Novell' in red.
// Want a new type? Add it here first, e.g. | 'Biography'
export type BookType = 'Novel' | 'Self Improvement' | 'Literature'

export type Book = {
  slug: string // short id for the URL, e.g. 'atomic-habits'. Later: /books/atomic-habits for the review page
  title: string
  author: string
  type: BookType // shown on the left of the card
  genre: string // shown at the bottom of the card
}

// TODO: these are examples, replace them with the books you've read
export const books: Book[] = [
  {
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    type: 'Self Improvement',
    genre: 'Habits',
  },
  {
    slug: 'norwegian-wood',
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    type: 'Novel',
    genre: 'Coming-of-age',
  },
  {
    slug: 'the-old-man-and-the-sea',
    title: 'The Old Man and the Sea',
    author: 'Ernest Hemingway',
    type: 'Literature',
    genre: 'Classic',
  },
]

// ---------- Tools I use ----------
// Grouped by category. `note` is optional: leave it out if there's nothing to add.
type Tool = { name: string; note?: string }

// TODO: replace these with your own setup
export const tools: { group: string; items: Tool[] }[] = [
  {
    group: 'Development',
    items: [
      { name: 'Xcode', note: 'for iOS apps' },
      { name: 'Antigravity', note: 'for web projects like this one' },
      { name: 'SF Symbols', note: "Apple's icon library" },
    ],
  },
  {
    group: 'Hardware',
    items: [
      { name: 'MacBook Pro' },
      { name: 'iPhone', note: 'my main test device' },
    ],
  },
  {
    group: 'Apps',
    items: [
      { name: 'Notes', note: 'for drafting posts' },
    ],
  },
]
