import { useEffect, useState } from 'react'

/**
 * Scroll-spy for the primary navigation.
 *
 * Uses a single IntersectionObserver with a band across the middle of the
 * viewport rather than a scroll listener, so it costs nothing per frame.
 * Sections opt in simply by existing with the matching `id`.
 *
 * Returns the id of the section currently occupying the reading band, or
 * `null` while the visitor is still in the hero.
 */
export function useScrollSpy(ids: readonly string[], enabled = true): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled || ids.length === 0) return
    if (typeof IntersectionObserver === 'undefined') return

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (nodes.length === 0) return

    const ratios = new Map<string, number>()

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0)
        })
        // The section with the largest visible area inside the band wins.
        let best: string | null = null
        let bestRatio = 0
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r
            best = id
          }
        })
        setActive(bestRatio > 0 ? best : null)
      },
      {
        // A narrow band just below the nav — the "reading line".
        rootMargin: '-22% 0px -62% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 1]
      }
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [ids, enabled])

  return active
}

/**
 * True once the window has scrolled past `offset`. Uses a passive scroll
 * listener guarded by a reading of `scrollY` — cheap, and only re-renders
 * when the boolean actually flips.
 */
export function useScrolled(offset = 48): boolean {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const read = () => {
      const next = window.scrollY > offset
      setPast((cur) => (cur === next ? cur : next))
    }
    read()
    window.addEventListener('scroll', read, { passive: true })
    return () => window.removeEventListener('scroll', read)
  }, [offset])

  return past
}
