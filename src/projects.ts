// Your projects, shown on the Project page (src/app/project/page.tsx).
// Add a project = add one entry to the list. The page numbers them 01, 02, 03... in this order.

export type Project = {
  slug: string // short id, e.g. 'habit-tracker' (also used as React's key)
  name: string
  tagline: string // ONE sentence that sells it. A showcase, not an explanation.
  description?: string // A short paragraph that explains what the project does and why it matters.
  year: string
  stack: string[] // platform + main tech, shown as "iOS · SwiftUI · 2024"
  color: string // the project's accent: number, glow, link hover. Pick a mid-tone so it works in light AND dark mode.

  // The big visual. Two choices:
  //   images -> pictures in /public/projects/, e.g. ['/projects/my-app-1.png', '/projects/my-app-2.png']
  //   emoji  -> no pictures yet? An app-icon style tile with this emoji is shown instead.
  images?: string[]
  // 'phone' (default) = phone screenshots WITH the phone frame already in the picture.
  //                     2 or 3 are shown side by side, overlapping. The first one is in front.
  // 'wide'            = a website/desktop screenshot. Only the first image is shown.
  // 'mockup'          = a finished design (e.g. a tilted 3D phone with its own glow, transparent background).
  //                     Shown large and as-is: the page adds no glow, shadow or frame of its own.
  imageShape?: 'phone' | 'wide' | 'mockup'
  // Optional dark-theme versions of `images`, in the same order.
  // Used by showcases that swap the picture with the theme (e.g. SPEECHShowcase).
  darkImages?: string[]
  emoji: string

  // Buttons under the text, drawn in this order. Leave the list empty for projects you can't link to.
  links: ProjectLink[]
}

// The kinds of button a project can have. Each `kind` is drawn differently:
//   github    -> a button with the GitHub logo
//   app-store -> Apple's official "Download on the App Store" badge
//   website   -> a plain button; `label` is optional (default: "Visit website")
// This is like a Swift enum with associated values: `kind` says which case it is,
// and TypeScript only allows `label` on the website case.
export type ProjectLink =
  | { kind: 'github'; href: string }
  | { kind: 'app-store'; href: string }
  | { kind: 'website'; href: string; label?: string }

// TODO: replace both with your real projects
export const projects: Project[] = [
  {
    slug: 'itz-time',
    name: "ITZ-Time",
    tagline: "Small tasks, never forget",
    description: "Plan and create your task everyday, handle them gracefully. ITZ-Task allow you to create and store your tasks, it is also can handle interruption",
    year: '2026',
    stack: ['iOS', 'SwiftUI'],
    color: '#E67E22',
    images: ['/projects/itz_image.png'],
    imageShape: 'mockup', // the picture already has the phone, the tilt and the orange glow
    emoji: '📱',
    links: [
      { kind: 'app-store', href: 'https://apps.apple.com/us/app/itz-time/id6837292532?itscg=30200&itsct=apps_box_link&mttnsubad=6837292532' }, // TODO: real link
    ],
  },
  {
    slug: 'speech',
    name: 'SPEECH (Discontinued)',
    tagline: "Handle VTuber's Discord server needs",
    description: 'Help fans keep updated by hooking Twitter (X) and Youtube',
    year: '2021',
    stack: ['Java Script', 'Discord'], 
    color: '#5b8def', 
    images: ['/projects/speech_mascot_light.png'], // shown in the light theme
    darkImages: ['/projects/speech_mascot_dark.png'], // shown in the dark theme
    imageShape: 'mockup',
    emoji: '🗣️',
    links: [
      { kind: 'github', href: 'https://github.com/terre29/SPEECH-Bot'}
    ], // TODO: add an app-store / github / website link
  },
]
