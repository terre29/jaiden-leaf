import type { CSSProperties } from 'react'
import LinkButton from '../LinkButton'
import type { ShowcaseProps } from '../ProjectShowcase'

// Same layout as ItzTimeShowcase. The difference is the picture:
// it swaps between a light and a dark version, and it's protected from "Save Image...".
export default function SPEECHShowcase({ project, index }: ShowcaseProps) {
    const flipped = index % 2 === 1
    const number = String(index + 1).padStart(2, '0')

    const lightSrc = project.images?.[0]
    // No dark version? Fall back to the light one.
    const darkSrc = project.darkImages?.[0] ?? lightSrc

    return (
        <section
            style={{ '--brand': project.color } as CSSProperties}
            className="grid items-center gap-12 py-10 md:grid-cols-2 md:gap-16 md:py-16"
        >
            {/* ---------- TEXT ---------- */}
            <div className={flipped ? 'order-last' : 'order-last md:order-first'}>
                {/* Same text block as ItzTimeShowcase (see the comments there) */}
                <p className="text-6xl font-light text-(--brand)/40 md:text-7xl">{number}</p>
                <h2 className="mt-4 text-xl tracking-tight">{project.name}</h2>
                <p className="mt-16 font-mono text-3xl font-medium text-balance md:text-5xl">{project.tagline}</p>
                {project.description && (
                    <p className="mt-8 text-lg leading-relaxed text-muted">{project.description}</p>
                )}

                <p className="mt-16 font-mono text-sm text-muted">{[...project.stack, project.year].join(' · ')}</p>

                {project.links.length > 0 && (
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        {project.links.map((link, i) => (
                            <LinkButton key={`${link.kind}-${i}`} link={link} />
                        ))}
                    </div>
                )}
            </div>

            {/*
              ---------- PICTURE ----------
              Light/dark swap (same trick as the App Store badge in LinkButton):
                dark:hidden        -> light picture: hidden in dark mode
                hidden dark:block  -> dark picture: only shown in dark mode

              "Can't save" protection:
                onContextMenu preventDefault -> right-click shows no menu at all
                pointer-events-none          -> the mouse "goes through" the image, so the browser
                                                never sees an image under the cursor
                select-none                  -> can't be highlighted / selected
                draggable={false}            -> can't be dragged to the desktop
                [-webkit-touch-callout:none] -> iPhone/iPad: no "Save to Photos" on long-press
                                                ([...] = a raw CSS property Tailwind has no class for)
            */}
            {lightSrc && (
                <div
                    className="flex select-none items-center justify-center"
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <img
                        src={lightSrc}
                        alt={project.name}
                        loading="lazy"
                        draggable={false}
                        className="pointer-events-none w-full max-w-xs rounded-2xl border border-line [-webkit-touch-callout:none] sm:max-w-sm dark:hidden"
                    />
                    <img
                        src={darkSrc}
                        alt={project.name}
                        loading="lazy"
                        draggable={false}
                        className="pointer-events-none hidden w-full max-w-xs rounded-2xl border border-line [-webkit-touch-callout:none] sm:max-w-sm dark:block"
                    />
                </div>
            )}
        </section>
    )
}
