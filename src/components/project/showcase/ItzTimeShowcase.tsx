import type { CSSProperties } from 'react'
import LinkButton from '../LinkButton'
import ProjectVisual from '../ProjectVisual'
import type { ShowcaseProps } from '../ProjectShowcase'

export default function ItzTimeShowcase({ project, index }: ShowcaseProps) {
    const flipped = index % 2 === 1

    // 0 -> "01", 1 -> "02". padStart adds a leading 0 until the text is 2 characters long.
    const number = String(index + 1).padStart(2, '0')

    return (
        /*
          style --brand   -> stores this project's colour in a CSS variable (same trick as SocialLinks),
                             so every child can use text-(--brand), bg-(--brand)/30, ...
          py-10 md:py-16  -> big vertical space: each project gets its own "screen"
          grid            -> phones: one column (picture on top, text below)
          md:grid-cols-2  -> from 768px: two columns side by side
          items-center    -> text and picture centred vertically against each other
        */
        <section
            style={{ '--brand': project.color } as CSSProperties}
            className="grid items-center gap-12 py-10 md:grid-cols-2 md:gap-16 md:py-16"
        >
            {/*
            ---------- TEXT ----------
            ORDER: on phones the text comes AFTER the picture (order-last).
            On wide screens: normal projects put the text first (left), flipped ones keep it last (right).
            The HTML order never changes, only where it's drawn.
          */}
            <div className={flipped ? 'order-last' : 'order-last md:order-first'}>
                {/*
                  Spacing: only mt- (margin-top) is used, so each gap is set by ONE class.
                  (A mb- above an mt- doesn't add up: the browser only keeps the bigger one.)

                  Tags are chosen for MEANING, classes for LOOK:
                    the number is decoration -> <p>, the project name is the heading -> <h2>
                */}
                {/* The big faded number: font-light + 40% opacity keeps it decorative, not loud */}
                <p className="text-6xl font-light text-(--brand)/40 md:text-7xl">{number}</p>
                <h2 className="mt-4 text-xl tracking-tight">{project.name}</h2>
                {/* Mobile-first: 30px on phones, 48px from md. text-balance -> evenly split lines */}
                <p className="mt-16 font-mono text-3xl font-medium text-balance md:text-5xl">{project.tagline}</p>
                {/* description is optional in projects.ts, so only draw it when there is one */}
                {project.description && (
                    <p className="mt-8 text-lg leading-relaxed text-muted">{project.description}</p>
                )}

                {/* [...stack, year].join(' · ') -> ['iOS', 'SwiftUI'] + '2024' -> "iOS · SwiftUI · 2024" */}
                <p className="mt-16 font-mono text-sm text-muted">{[...project.stack, project.year].join(' · ')}</p>

                {/* Only draw the buttons row if there are links.
                items-center -> the badge and the buttons line up in the middle */}
                {project.links.length > 0 && (
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        {/* key: kind + position, so two links of the same kind never clash */}
                        {project.links.map((link, i) => (
                            <LinkButton key={`${link.kind}-${i}`} link={link} />
                        ))}
                    </div>
                )}
            </div>

            {/* ---------- PICTURE ---------- */}
            <ProjectVisual project={project} />
        </section>
    )
}