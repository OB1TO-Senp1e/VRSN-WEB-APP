import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer, usePrefersReducedMotion } from '../hooks/useMedia'

interface MagneticButtonProps {
  children: ReactNode
  /** 0.15–0.3 keeps it felt rather than seen. */
  strength?: number
  className?: string
}

/**
 * Subtle magnetic pull toward the pointer (spec §19).
 * Desktop + non-reduced-motion only; translate-only so it stays on the
 * compositor.
 */
export default function MagneticButton({
  children,
  strength = 0.22,
  className
}: MagneticButtonProps) {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const enabled = fine && !reduced

  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 20, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 180, damping: 20, mass: 0.35 })

  const onPointerMove = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength * 0.65)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={enabled ? { x: sx, y: sy } : undefined}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.div>
  )
}
