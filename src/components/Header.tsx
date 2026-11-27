import { Link, NavLink } from 'react-router'
import { site } from '../site'
import SocialLinks from './SocialLinks'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'

// The site menu. It has two looks:
//   Phones & tablets (below 1024px): a bar across the top.
//   Laptops & desktops (1024px+):    a sidebar on the left.
// Classes WITHOUT a prefix are the top bar; classes with lg: turn it into the sidebar.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-10 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      {/*// --- Both looks ---
      // sticky top-0     -> stays in place while you scroll
      // z-10             -> sits above the page content
      // bg-bg/80         -> page background at 80% opacity
      // backdrop-blur    -> blurs whatever scrolls underneath
      // --- Top bar ---
      // border-b         -> 1px line on the bottom; border-line sets its colour
      // --- Sidebar (lg:) ---
      // lg:h-screen      -> full window height
      // lg:w-60          -> 15rem wide
      // lg:shrink-0      -> never gets squeezed by the page content
      // lg:border-b-0 lg:border-r -> swap the bottom line for a line on the right
      */}
      <header className="sticky top-0 z-10 border-b border-line bg-bg/80 backdrop-blur
                       lg:h-screen lg:w-70 lg:shrink-0 lg:border-b-0 lg:border-r">
        {/*
        --- Top bar ---
        flex items-center justify-between -> logo on the left, menu on the right, in one row
        h-16      -> 4rem tall
        max-w-5xl -> never wider than 64rem, so it lines up with the page content
        mx-auto   -> centre it horizontally
        px-4      -> 1rem of padding on the sides so text never touches the screen edge
        --- Sidebar (lg:) ---
        lg:h-full         -> fill the sidebar's full height
        lg:flex-col       -> logo ABOVE the menu instead of beside it
        lg:items-start    -> line everything up on the left
        lg:justify-start  -> stack from the top (instead of pushing apart to both ends)
        lg:gap-8          -> 2rem between the logo and the menu
        lg:px-6 lg:py-10  -> roomier padding inside the sidebar
      */}
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4
                lg:h-full lg:flex-col lg:items-start lg:justify-start lg:gap-8 lg:px-6 lg:py-10">
          {/*
          Name + tagline, grouped in one wrapper <div>.
          Why a wrapper? The parent puts a gap-8 (2rem) between each of its children.
          Grouping the name and tagline makes them ONE child, so they stay close together
          and the big gap only comes after the tagline.
          lg:w-full -> as wide as the sidebar, so the divider line spans the full width
        */}
          <div className="flex-1 lg:w-full lg:flex-none">
            {/* Row: name on the left, sun pushed to the right (ThemeToggle has ml-auto) */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 font-semibold text-ink hover:text-leaf">
                <span className="text-xl">{site.emoji}</span>
                <span>{site.name}</span>
              </Link>
              <ThemeToggle />
            </div>
            {/*
            Divider + tagline.
            hidden lg:block -> hidden in the phone top bar (only 4rem tall, no room),
                               shown in the sidebar
            <hr>            -> a horizontal line
            my-3            -> 0.75rem of space above and below the line
            border-line     -> same line colour as the header's borders
            text-sm text-muted -> smaller, softer text so the name stays the focus
          */}
            <div className="hidden lg:block">
              <hr className="my-3 border-line" />
              <p className="text-justify text-sm text-muted">{site.tagline}</p>
            </div>
          </div>

          {/*
          Top bar: flex items-center gap-1 -> links in a row with a small gap
          Sidebar: lg:w-full        -> menu as wide as the sidebar
                   lg:flex-col      -> links stacked vertically
                   lg:items-stretch -> each link full width, so its highlight is a full-width bar
        */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="ml-2 rounded-md p-2 text-muted hover:bg-surface hover:text-ink lg:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <nav
            id="site-menu"
            className={`${menuOpen ? 'flex' : 'hidden'} absolute shadow-lg right-4 min-w-44 mt-2 top-full flex-col gap-1 border rounded-lg border-line bg-surface p-2 lg:static lg:flex lg:w-full lg:items-stretch lg:self-start lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:rounded-none lg:mt-0 lg:min-w-0
`}>
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                // NavLink tells us when its page is open (isActive),
                // so the current page link can look different.
                className={({ isActive }) =>
                  [
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-leaf/25 font-semibold text-leaf lg:bg-leaf-soft lg:font-medium'                          // current page
                      : 'text-muted hover:bg-surface hover:text-ink',     // other links
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/*
          Social links at the BOTTOM of the sidebar.
          hidden lg:flex -> hidden in the phone top bar (no room), shown in the sidebar
          lg:mt-auto     -> "margin-top: auto" eats up all the free space above it,
                            pushing it down to the bottom of the sidebar
        */}
          <SocialLinks className="hidden lg:mt-auto lg:flex" />
        </div>
      </header>
    </>
  )

  function MenuIcon() {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu preview-icon"><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></svg>
      </svg>
    )
  }

  function CloseIcon() {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x preview-icon"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
      </svg>
    )
  }
}
