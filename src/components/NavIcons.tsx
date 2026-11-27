// The menu icons (Blog, About Me, Project, Book).
//
// Importing an image file gives you its URL, ready for <img src>.
// On build, Vite handles it for you, either way with no ?v=2 needed:
//   small files (under 4 KB, like these) -> embedded straight into the JavaScript, no extra download
//   bigger files                         -> copied with a fingerprint in the name (blog-a1b2c3.svg)
import blog from '../assets/icons/blog.svg'
import book from '../assets/icons/book.svg'
import person from '../assets/icons/person.svg'
import soil from '../assets/icons/soil.svg'

// Name -> image. site.ts refers to icons by these names.
const sources = { blog, person, soil, book }

// The allowed names, worked out from `sources` above: 'blog' | 'person' | 'soil' | 'book'.
// Add an icon to `sources` and it becomes a valid name automatically.
export type NavIconName = keyof typeof sources

// Why <img> and not inline SVG like the sun/moon icons?
// Those are one-colour line icons that follow the text colour (currentColor).
// These are full-colour illustrations: they keep their own colours, so a plain image is enough.
export default function NavIcon({ name }: { name: NavIconName }) {
    return (
        /*
          alt=""      -> decorative: the menu label next to it already says what it is,
                         so screen readers skip the image instead of saying "Blog, Blog"
          size-5      -> 20px. Your icons are detailed (64×64 originals),
                         so going smaller than this starts to blur the details together
          shrink-0    -> never squashed when the menu is narrow
        */
        <img src={sources[name]} alt="" className="size-8 shrink-0" />
    )
}
