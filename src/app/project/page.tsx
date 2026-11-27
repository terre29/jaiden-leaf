import type { ComponentType } from 'react'
import ProjectShowcase, { type ShowcaseProps } from '../../components/project/ProjectShowcase'
import ItzTimeShowcase from '../../components/project/showcase/ItzTimeShowcase'
import SPEECHShowcase from '../../components/project/showcase/SPEECHShowcase'
import { projects } from '../../projects'

const customShowcases: Record<string, ComponentType<ShowcaseProps>> = {
  'itz-time': ItzTimeShowcase,
  speech: SPEECHShowcase,
}

export default function ProjectPage() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* ---------- Hero ----------
          The "grand" part is mostly SIZE and SPACE:
          text-4xl -> md:text-6xl  -> a very large heading on wide screens
          py-12 md:py-20           -> lots of empty space around it
          text-balance             -> spreads a 2-line heading evenly instead of leaving one lonely word */}
      <header className="py-12 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-leaf">Projects</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance md:text-6xl">
          Things I've made
        </h1>
        {/* TODO: your own one-liner */}
        <p className="mt-4 max-w-xl text-lg text-muted">
          A few projects I'm proud of, from idea to the App Store.
        </p>
      </header>

      {/* divide-y -> a thin line BETWEEN projects (same trick as the post list) */}
      <div className="divide-y divide-line border-t border-line">
        {projects.map((project, index) => {
          // ?? -> "if there's no custom one for this slug, use the default"
          const Showcase = customShowcases[project.slug] ?? ProjectShowcase
          return <Showcase key={project.slug} project={project} index={index} />
        })}
      </div>
    </div>
  )
}