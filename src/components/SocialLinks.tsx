import type { CSSProperties } from 'react'
import { site } from '../site'
import { icons } from '../icons'

// A row of coloured logo buttons. className lets the parent decide where it goes.
export default function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex gap-2 ${className}`}>
      {site.social.map((link) => (
        <li key={link.label}>
          {/*
            target="_blank"            -> opens in a new tab, so your blog stays open
            rel="noopener noreferrer"  -> safety setting that always goes with target="_blank"
            aria-label                 -> the name screen readers say, since there's no visible text

            COLOURING EACH ICON DIFFERENTLY:
            style={{ '--brand': ... }} -> stores this link's colour in a CSS variable called --brand
            text-(--brand)             -> Tailwind: text colour = that variable (colours the logo)
            bg-(--brand)/15            -> background = the same colour at 15% opacity (a soft tint)
            hover:bg-(--brand)/25      -> a bit stronger on hover
            One set of classes, three different colours.
          */}
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            style={{ '--brand': link.color } as CSSProperties}
            className="flex size-10 items-center justify-center rounded-lg bg-(--brand)/15 text-(--brand) transition-all hover:-translate-y-0.5 hover:bg-(--brand)/25"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
              <path d={icons[link.icon]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
