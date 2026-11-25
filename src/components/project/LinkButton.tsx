import { icons } from '../../icons'
import type { ProjectLink } from '../../projects'

export default function LinkButton({ link }: { link: ProjectLink }) {
    // Shared by every button: <a>, not <Link>, because these go to OTHER websites.
    // target="_blank" -> new tab, so your site stays open
    const external = { href: link.href, target: '_blank', rel: 'noopener noreferrer' }

    // h-10 on every button -> the same height as the App Store badge, so the row lines up
    const buttonClass =
        'inline-flex h-10 items-center gap-2 rounded-lg border border-line px-4 text-sm font-semibold text-ink transition-colors hover:border-(--brand) hover:text-(--brand)'

    switch (link.kind) {
        case 'app-store':
            return (
                // Apple's rules: use their official badge image as-is (no recolouring, no redrawing).
                // Two versions in public/badges/: black for the light theme, white for the dark theme.
                // Both images are on the page; CSS shows only the one that fits the current theme.
                //   dark:hidden        -> black badge: shown, but hidden in dark mode
                //   hidden dark:block  -> white badge: hidden, but shown in dark mode
                // (A hidden image is also skipped by screen readers, so the label is never read twice.)
                <a {...external} className="transition-opacity hover:opacity-80">
                    <img src="/badges/appstore-black.svg" alt="Download on the App Store" className="h-10 dark:hidden" />
                    <img src="/badges/appstore-white.svg" alt="Download on the App Store" className="hidden h-10 dark:block" />
                </a>
            )

        case 'github':
            return (
                <a {...external} className={buttonClass}>
                    {/* Same GitHub logo as the sidebar, from src/icons.ts */}
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
                        <path d={icons.github} />
                    </svg>
                    View on GitHub
                </a>
            )

        case 'website':
            return (
                <a {...external} className={buttonClass}>
                    {/* ?? means "if label is missing, use this instead" */}
                    {link.label ?? 'Visit website'}
                    {/* ↗ = "opens somewhere else". aria-hidden: screen readers don't need the arrow */}
                    <span aria-hidden="true">↗</span>
                </a>
            )
    }
}