import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer, usePrefersReducedMotion } from '../hooks/useMedia'

type Mode = 'hidden' | 'dot' | 'arrow' | 'view' | 'talk'

/** Per-mode geometry & label. */
const MODES: Record<Exclude<Mode, 'hidden'>, { size: number; label: string }> = {
  dot: { size: 10, label: '' },
  arrow: { size: 44, label: '→' },
  view: { size: 104, label: 'VIEW →' },
  talk: { size: 120, label: "LET'S TALK →" }
}

/**
 * Minimal custom cursor. Fine pointers only; disabled for touch,
 * tablets and prefers-reduced-motion. Uses mix-blend-difference so
 * the same element reads as ink on paper and paper on ink.
 *
 * Opt in from any element with:
 *   data-cursor="view" | "talk" | "arrow"
 */
export default function CustomCursor() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const enabled = fine && !reduced

  const [mode, setMode] = useState<Mode>('hidden')
  const modeRef = useRef<Mode>('hidden')
  modeRef.current = mode

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.5 })

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor')
      return
    }
    document.body.classList.add('has-custom-cursor')

    const resolve = (target: EventTarget | null): Mode => {
      if (!(target instanceof Element)) return 'dot'
      const flagged = target.closest<HTMLElement>('[data-cursor]')
      if (flagged) {
        const v = flagged.dataset.cursor
        if (v === 'view' || v === 'talk' || v === 'arrow') return v
      }
      if (target.closest('a, button, [role="button"], input, textarea, select')) return 'arrow'
      return 'dot'
    }

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const next = resolve(e.target)
      if (next !== modeRef.current) setMode(next)
    }
    const onLeave = () => setMode('hidden')
    const onDown = () => setMode((m) => m)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    window.addEventListener('pointerdown', onDown, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('pointerdown', onDown)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const active = mode === 'hidden' ? MODES.dot : MODES[mode]
  const isLabelled = mode === 'view' || mode === 'talk' || mode === 'arrow'

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-[#f4f1eb] mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: active.size,
        height: active.size,
        opacity: mode === 'hidden' ? 0 : 1
      }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className="select-none whitespace-nowrap font-medium text-[#0e0e0d] [font-family:var(--font-mono)]"
        animate={{
          opacity: isLabelled ? 1 : 0,
          fontSize: mode === 'arrow' ? '1rem' : '0.625rem',
          letterSpacing: mode === 'arrow' ? '0em' : '0.14em'
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {active.label}
      </motion.span>
    </motion.div>
  )
}
