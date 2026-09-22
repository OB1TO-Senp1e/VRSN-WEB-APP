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
  baseVelocity?: number
  className?: string
}

/**
 * Infinite marquee whose speed & direction respond subtly to scroll
 * velocity. GPU-friendly: transforms only.
 */
export default function Marquee({ items, baseVelocity = 2.2, className = '' }: MarqueeProps) {
  const reduced = usePrefersReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 })
  const velocityFactor = useTransform(smoothVelocity, [-1200, 0, 1200], [-2.5, 0, 2.5], { clamp: true })
  const directionRef = useRef(1)

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    let moveBy = directionRef.current * baseVelocity * (delta / 1000)
    const vf = velocityFactor.get()
    if (vf < 0) directionRef.current = -1
    else if (vf > 0) directionRef.current = 1
    moveBy += directionRef.current * moveBy * Math.abs(vf)
    baseX.set(baseX.get() - moveBy)
  })

  const row = items.join('  ·  ')

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <motion.div className="marquee-track" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="display pr-10 text-[clamp(3rem,9vw,8rem)] leading-none">
            {row}
            <span className="px-6 text-accent">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
