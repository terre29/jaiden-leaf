import { useEffect, useState } from 'react'

// Watches the headings on the page and returns the id of the one you are reading,
// so the table of contents can highlight it.
export function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    const elements = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    // A heading counts as "active" when it enters a band near the top of the screen
    // (80px below the top, ending 70% of the way down).
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-80px 0px -70% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return activeId
}
