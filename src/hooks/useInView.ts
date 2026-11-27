import { useEffect, useRef, useState } from 'react'

// Tells you when an element has scrolled into view.
// Usage: const { ref, inView } = useInView()  then  <section ref={ref}>
export function useInView() {
  // ref = a "handle" to the real HTML element, so we can watch it
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // stop watching: animate only the FIRST time
        }
      },
      { threshold: 1 }, // "in view" = at least 20% of it is on screen
    )

    observer.observe(element)
    return () => observer.disconnect() // clean up if the page closes first
  }, [])

  return { ref, inView }
}