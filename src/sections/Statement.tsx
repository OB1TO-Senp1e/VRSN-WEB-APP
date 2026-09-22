import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import { statement } from '../data/content'
import RevealText from '../components/RevealText'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

/**
 * Per-line choreography. Each line travels a different distance in a
 * different direction, so scrolling through the block feels like the
 * composition is settling rather than sliding as one slab.
 */
const DRIFT = [
  { from: 3.5, to: -3.5 },
  { from: -6, to: 4.5 },
  { from: 2, to: -5 }
] as const

function DriftLine({
  children,
  progress,
  range,
  reduced,
  className = ''
}: {
  children: React.ReactNode
  progress: MotionValue<number>
  range: { from: number; to: number }
  reduced: boolean
  className?: string
}) {
  const x = useTransform(
    progress,
    [0, 1],
    reduced ? ['0%', '0%'] : [`${range.from}%`, `${range.to}%`]
  )
  return (
    <span className={`block will-change-transform ${className}`}>
      <motion.span className="block" style={{ x }}>
        {children}
      </motion.span>
    </span>
  )
}

/**
 * The large typographic statement — the page's loudest moment.
 *
 * Type is the object here, not a container for text: three lines at mega
 * scale, stepped into the right margin, drifting on opposing axes as the
 * section passes, with a stroked echo of the middle line offset behind it
 * so the block reads as overlapping letterforms rather than a heading.
 *
 * The final line is set a step larger than the first two — variable scale
 * is what stops a stack like this reading as a template.
 */
export default function Statement() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section
      ref={ref}
      data-theme="ink"
      className="chapter-ink section relative overflow-hidden"
      aria-label="Studio statement"
    >
      <div className="shell">
        {/* Marker row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14 flex items-baseline justify-between gap-6 border-b border-line pb-5 md:mb-20"
        >
          <p className="sec-label">
            <span className="n">( 02 )</span>
            <span>Statement</span>
          </p>
          <p className="t-meta hidden sm:block">The claim</p>
        </motion.div>

        {/* The type object */}
        <h2 className="t-mega -ml-[0.02em]">
          <RevealText
            as="div"
            lines={[
              <DriftLine
                key="a"
                progress={scrollYProgress}
                range={DRIFT[0]}
                reduced={reduced}
              >
                {statement.headline[0]}
              </DriftLine>,

              <DriftLine
                key="b"
                progress={scrollYProgress}
                range={DRIFT[1]}
                reduced={reduced}
                className="md:pl-[13vw]"
              >
                {/* Stroked echo, offset behind the solid wordforms */}
                <span className="relative block">
                  <span
                    aria-hidden="true"
                    className="t-outline pointer-events-none absolute left-[0.09em] top-[0.055em] hidden select-none md:block"
                  >
                    {statement.headline[1]}
                  </span>
                  <span className="relative">{statement.headline[1]}</span>
                </span>
              </DriftLine>,

              <DriftLine
                key="c"
                progress={scrollYProgress}
                range={DRIFT[2]}
                reduced={reduced}
                className="md:pl-[26vw]"
              >
                <span className="text-[clamp(3.75rem,15.5vw,17.5rem)] leading-[0.82]">
                  <span className="em text-accent">{statement.em}</span>
                  <span className="text-accent">.</span>
                </span>
              </DriftLine>
            ]}
          />
        </h2>

        {/* The argument, set small and narrow against the loud claim */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-8 md:mt-28 md:grid-cols-12 md:gap-10"
        >
          <motion.p variants={fadeUp} className="sec-label md:col-span-3">
            <span className="n">( 03 )</span>
            <span>Positioning</span>
          </motion.p>

          <div className="md:col-span-6 md:col-start-7">
            {statement.body.map((p) => (
              <motion.p key={p} variants={fadeUp} className="t-body [&+&]:mt-6">
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
