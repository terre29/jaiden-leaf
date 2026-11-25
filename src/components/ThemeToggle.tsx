import { useState } from 'react'

type Theme = 'light' | 'dark'

// A button that switches the site between light and dark.
//
// How it works:
//   1. The colours live in CSS variables (src/index.css).
//   2. <html data-theme="light"> swaps those variables for the light set.
//   3. This button just changes that one attribute, and remembers the choice.
export default function ThemeToggle({ className = 'ml-auto' }: { className?: string }) {
  // useState remembers which theme is on, so the button can show the right icon.
  // The () => ... form reads the starting value once: whatever index.html already set.
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next // the actual switch
    try {
      localStorage.setItem('theme', next) // remember it for the next visit
    } catch {
      // localStorage can be blocked (e.g. private mode); the switch still works for this visit.
    }
    setTheme(next) // update the icon
  }

  const isDark = theme === 'dark'

  function sunIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-sun preview-icon"
      >
        <circle cx={12} cy={12} r={4} />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    )
  }

  function moonIcon() {
    return <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-moon preview-icon"
    >
      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
    </svg>
  }

  return (
    // <button> (not a link): it does something on the page instead of going somewhere.
    // aria-label -> what screen readers say, since on phones only the icon shows.
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium text-muted
                  transition-colors hover:bg-surface hover:text-ink ${className}`}
    >
      {/* The icon shows where you'll GO: a sun in dark mode, a moon in light mode */}
      <span aria-hidden="true">{isDark ? sunIcon() : moonIcon()}</span>
      {/* hidden lg:inline -> phones show only the icon; the sidebar has room for the words */}
    </button>
  )
}
