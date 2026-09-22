import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'

/** The statement, split into scroll-revealed lines. */
const LINES: { text: string; shift: number; emphasis?: string }[] = [
  { text: 'DESIGN', shift: -3 },
  { text: 'SHOULD BE', shift: 4 },
  { text: 'FELT.', shift: -2, emphasis: 'FELT.' }
]

function Line({
  line,
  index,
  total,
  progress,
  reduced
}: {
  line: (typeof LINES)[number]
  index: number
  total: number
  progress: MotionValue<number>
  reduced: boolean
}) {
  /* Each line owns a slice of the scroll range and resolves in sequence. */
  const start = 0.04 + (index / total) * 0.52
  const end = start + 0.3

  const opacity = useTransform(progress, [start, end], reduced ? [1, 1] : [0.12, 1])
  const x = useTransform(
    progress,
    [start, end],
    reduced ? ['0%', '0%'] : [`${line.shift}%`, '0%']
  )
  const y = useTransform(progress, [start, end], reduced ? [0, 0] : [26, 0])

  return (
    <span className="block overflow-hidden pb-[0.05em]">
      <motion.span
        className="block will-change-transform"
        style={{ opacity, x, y }}
      >
        {line.emphasis ? (
          <>
            <span className="t-em pr-[0.05em] text-accent">Felt</span>.
          </>
        ) : (
          line.text
        )}
      </motion.span>
    </span>
  )
}

/**
 * Oversized scroll-triggered statement (spec §05). Words resolve out of
 * near-invisibility with a small horizontal settle; the section ground
 * lifts a touch so the band reads as its own chapter.
 */
export default function Statement() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 55%']
  })

  const bg = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    reduced ? ['#0b0b0c', '#0b0b0c', '#0b0b0c'] : ['#0b0b0c', '#101011', '#0b0b0c']
  )
  const footY = useTransform(scrollYProgress, [0.55, 1], reduced ? [0, 0] : [24, 0])
  const footOpacity = useTransform(scrollYProgress, [0.6, 0.92], reduced ? [1, 1] : [0, 1])

  return (
    <motion.section
      ref={ref}
      style={{ backgroundColor: bg }}
      className="relative overflow-hidden py-28 md:py-40 lg:py-48"
      aria-label="Studio philosophy"
    >
      <div className="shell">
        <h2 className="t-display text-bone">
          {LINES.map((line, i) => (
            <Line
              key={line.text}
              line={line}
              index={i}
              total={LINES.length}
              progress={scrollYProgress}
              reduced={reduced}
            />
          ))}
        </h2>

        <motion.div
          style={{ y: footY, opacity: footOpacity }}
          className="mt-12 grid gap-8 border-t border-[var(--border)] pt-8 md:mt-16 md:grid-cols-12"
        >
          <p className="t-meta md:col-span-3">Working principle</p>
          <p className="t-body max-w-[46ch] md:col-span-6 md:col-start-7">
            A brand is not a logo, a palette or a deck. It is the residue left
            behind after every encounter — so we design the encounters.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
