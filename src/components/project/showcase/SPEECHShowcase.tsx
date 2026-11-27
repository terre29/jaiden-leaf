import type { CSSProperties } from 'react'
import LinkButton from '../LinkButton'
import type { ShowcaseProps } from '../ProjectShowcase'
import { useInView } from '../../../hooks/useInView'

// Same layout as ItzTimeShowcase. The difference is the picture:
// it swaps between a light and a dark version, and it's protected from "Save Image...".
export default function SPEECHShowcase({ project, index }: ShowcaseProps) {
    const flipped = index % 2 === 1
    const number = String(index + 1).padStart(2, '0')
    const { ref, inView } = useInView() // true once the section scrolls into view

    // The text slides in from ITS OWN side: from the right when it sits on the right (flipped),
    // from the left otherwise. translate-x-12 = 3rem right, -translate-x-12 = 3rem left.
    const textStart = flipped ? 'translate-x-12' : '-translate-x-12'

    const lightSrc = project.images?.[0]
    // No dark version? Fall back to the light one.
    const darkSrc = project.darkImages?.[0] ?? lightSrc

    return (
        /*
          ref={ref}       -> useInView watches THIS element (it doesn't move, so it's a steady target)
          overflow-x-clip -> while the text waits 3rem to the right, it sticks out past the screen edge.
                             Without this, phones would get a sideways scrollbar.
        */
        <section
            ref={ref}
            style={{ '--brand': project.color } as CSSProperties}
            className="grid items-center gap-12 overflow-x-clip py-10 md:grid-cols-2 md:gap-16 md:py-16"
        >
            {/*
              ---------- TEXT ----------
              transition duration-700 ease-out -> animate class changes over 0.7s, slowing down at the end
              motion-reduce:transition-none    -> with "Reduce Motion" on, it just appears
            */}
            <div
                className={[
                    flipped ? 'order-last' : 'order-last md:order-first',
                    'transition duration-700 ease-out motion-reduce:transition-none',
                    inView ? 'opacity-100 translate-x-0' : `opacity-0 ${textStart}`,
                ].join(' ')}
            >
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

              Animation: rises from below, 0.2s after the text (delay-200), like ITZ-Time.
            */}
            {lightSrc && (
                <div
                    className={[
                        'flex select-none items-center justify-center',
                        'transition duration-700 ease-out delay-200 motion-reduce:transition-none',
                        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
                    ].join(' ')}
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
