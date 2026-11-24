import { Link, NavLink } from 'react-router'
import { site } from '../site'
import SocialLinks from './SocialLinks'

// The site menu. It has two looks:
//   Phones & tablets (below 1024px): a bar across the top.
//   Laptops & desktops (1024px+):    a sidebar on the left.
// Classes WITHOUT a prefix are the top bar; classes with lg: turn it into the sidebar.
export default function Header() {
  return (
    // --- Both looks ---
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
    <header className="sticky top-0 z-10 border-b border-line bg-bg/80 backdrop-blur
                       lg:h-screen lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r">
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
        {/* Logo: flex + gap-2 puts the emoji and name side by side with a small gap */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-ink hover:text-leaf">
          <span className="text-xl">{site.emoji}</span>
          <span>{site.name}</span>
        </Link>

        {/*
          Top bar: flex items-center gap-1 -> links in a row with a small gap
          Sidebar: lg:w-full        -> menu as wide as the sidebar
                   lg:flex-col      -> links stacked vertically
                   lg:items-stretch -> each link full width, so its highlight is a full-width bar
        */}
        <nav className="flex items-center gap-1 lg:w-full lg:flex-col lg:items-stretch">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              // NavLink tells us when its page is open (isActive),
              // so the current page link can look different.
              className={({ isActive }) =>
                [
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-leaf-soft text-leaf'                          // current page
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
  )
}
