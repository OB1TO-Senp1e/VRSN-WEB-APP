import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer, usePrefersReducedMotion } from '../hooks/useMedia'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

/** Subtle magnetic pull toward the cursor for important CTAs. */
export default function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  const enabled = fine && !reduced

  const onMouseMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={enabled ? { x: sx, y: sy } : undefined}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}
