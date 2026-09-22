import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap
} from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'

interface MarqueeProps {
  items: string[]
  /** Percent of track width per second. Keep low — this should be calm. */
  speed?: number
  /** Base travel direction. */
  direction?: 1 | -1
  /** Typographic scale of the band. */
  size?: 'md' | 'lg'
  className?: string
  separator?: string
}

const REPEATS = 4

/**
 * Infinite typographic marquee (spec §13). Slow and smooth; scroll
 * velocity nudges the speed and can invert direction, but the band
 * never becomes the focus. Transform-only.
 */
export default function Marquee({
  items,
  speed = 1.6,
  direction = -1,
  size = 'lg',
  className = '',
  separator = '×'
}: MarqueeProps) {
  const reduced = usePrefersReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 })
  const velocityFactor = useTransform(smoothVelocity, [-1400, 0, 1400], [-1.8, 0, 1.8], {
    clamp: true
  })
  const dirRef = useRef<number>(direction)

  const x = useTransform(baseX, (v) => `${wrap(-100 / REPEATS, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    const vf = velocityFactor.get()
    if (vf < -0.05) dirRef.current = -direction
    else if (vf > 0.05) dirRef.current = direction

    const step = (speed / 100) * (delta / 1000) * 100
    baseX.set(baseX.get() + dirRef.current * step * (1 + Math.abs(vf)))
  })

  const row = items.join(`   ${separator}   `)
  const type =
    size === 'lg'
      ? 'text-[clamp(2.75rem,8.5vw,7.5rem)]'
      : 'text-[clamp(1.5rem,4vw,3.25rem)]'

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.div className="marquee-track" style={{ x }}>
        {Array.from({ length: REPEATS }).map((_, i) => (
          <span
            key={i}
            className={`display whitespace-nowrap pr-[0.35em] ${type}`}
          >
            {row}
            <span className="px-[0.35em] text-accent">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
