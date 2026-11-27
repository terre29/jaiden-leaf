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
      // "in view" = the section's top has reached the lower 80% of the screen.
      //   threshold: 0     -> any part of it counts, so it works for tall sections too
      //                       (a % threshold like 0.9 can never be reached when the section
      //                        is taller than the screen, which happens on phones)
      //   rootMargin       -> top, right, bottom, left: -20% on the bottom ignores the lowest
      //                       fifth of the screen, so it waits until the section is a bit further up
      { threshold: 0, rootMargin: '0px 0px -20% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect() // clean up if the page closes first
  }, [])

  return { ref, inView }
}