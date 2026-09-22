import { motion, useScroll, useSpring } from 'framer-motion'

/** Hairline scroll progress (spec §20) — 1px, accent, top edge. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-accent"
      style={{ scaleX }}
    />
  )
}
