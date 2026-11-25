import type { Project } from '../../projects'

// The big visual, with a soft coloured glow behind it.
export default function ProjectVisual({ project }: { project: Project }) {
    // A mockup brings its own glow, so the page's glow would double it up.
    const showGlow = project.imageShape !== 'mockup'

    return (
        /*
          relative  -> the glow (absolute) positions itself inside this box
          isolate   -> keeps the glow's -z-10 INSIDE this box. Without it, -z-10 could slip
                       behind the page background and disappear.
          flex justify-center -> pictures centred in their column
        */
        <div className="relative isolate flex justify-center">
            {/*
        The glow: a blurred circle in the project colour.
        absolute inset-8 -> fills the box, 2rem in from each edge
        -z-10            -> behind the pictures
        blur-3xl         -> very soft edges: it reads as light, not as a shape
        It also helps dark phone frames stand out on the dark theme.
      */}
            {showGlow && (
                <div aria-hidden="true" className="absolute inset-8 -z-10 rounded-full bg-(--brand)/30 blur-3xl" />
            )}

            <Pictures project={project} />
        </div>
    )
}

// Decides WHAT to show: phones, a wide screenshot, or the emoji tile.
// Each `if` returns early, so only one of them is ever drawn.
function Pictures({ project }: { project: Project }) {
    // ?? [] -> if the project has no images, use an empty list instead
    const images = project.images ?? []

    // 1. No pictures yet: an app-icon style tile.
    if (images.length === 0) {
        return (
            /*
              rounded-[2.75rem] -> a custom radius (the [...] means "this exact value"),
                                   close to the rounded-square shape of an iOS app icon
              ring-1            -> thin outline in the project colour
            */
            <div className="flex size-48 items-center justify-center rounded-[2.75rem] bg-(--brand)/15 text-8xl shadow-2xl ring-1 ring-(--brand)/30 md:size-56">
                <span aria-hidden="true">{project.emoji}</span>
            </div>
        )
    }

    // 2. A finished mockup: one large picture, shown exactly as designed.
    if (project.imageShape === 'mockup') {
        return (
            /*
              w-full max-w-xs   -> fill the column, but never wider than 20rem on phones...
              sm:max-w-sm       -> ...or 24rem from 640px, so it stays big without towering over the text.
              No shadow, frame or rounding: they're already part of the picture.
            */
            <img
                src={images[0]}
                alt={`${project.name} on an iPhone`}
                loading="lazy"
                className="w-full max-w-xs sm:max-w-sm"
            />
        )
    }

    // 3. A website / desktop screenshot: one wide picture with a simple frame.
    if (project.imageShape === 'wide') {
        return (
            <img
                src={images[0]}
                alt={`Screenshot of ${project.name}`}
                loading="lazy"
                className="w-full rounded-xl border border-line shadow-2xl"
            />
        )
    }

    // 4. Phone screenshots (the default): side by side, overlapping, staggered.
    //
    //   ┌────┐
    //   │ 1  │┌────┐      1 = in front, top
    //   │    ││ 2  │      2 = pulled left under 1 (-ml-10), lower (mt-12)
    //   └────┘│    │
    //         └────┘
    return (
        <div className="flex items-start">
            {/* .slice(0, 3) -> at most 3 phones, more won't fit the column */}
            {images.slice(0, 3).map((src, i) => (
                <img
                    key={src}
                    src={src}
                    alt={`${project.name}, screen ${i + 1}`}
                    loading="lazy" // only download it when the visitor scrolls near it
                    className={[
                        /*
                          Width grows with the screen, but shrinks at md: (two columns + sidebar = less room).
                          drop-shadow-2xl -> a shadow that follows the picture's SHAPE.
                                             Your screenshots have transparent corners around the phone,
                                             so a normal shadow-2xl would draw a square shadow; this one
                                             follows the rounded phone.
                          No border/rounded classes: the phone frame is already in the picture.
                        */
                        'w-36 drop-shadow-2xl sm:w-44 md:w-40 xl:w-48',
                        // First phone: on top of the others. The rest: tucked behind and lower.
                        i === 0 ? 'relative z-10' : '-ml-10 mt-12',
                    ].join(' ')}
                />
            ))}
        </div>
    )
}
