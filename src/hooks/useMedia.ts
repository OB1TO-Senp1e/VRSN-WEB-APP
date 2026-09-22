import { useEffect, useState } from 'react'

/** Reactive matchMedia hook. */
export function useMedia(query: string, initial = false): boolean {
  const [matches, setMatches] = useState(initial)
  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export const useFinePointer = () => useMedia('(pointer: fine)')
export const usePrefersReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)')
