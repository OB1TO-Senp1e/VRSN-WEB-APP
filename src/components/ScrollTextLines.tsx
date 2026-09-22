import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { kinetic, kineticLines, type KineticLine } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/useMedia'

/** Base horizontal placement of each line inside the bleed. */
const TEXT_ALIGN: Record<KineticLine['align'], string> = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right'
}

/**
 * One kinetic line.
 *
 * The line is locked to the section's own scroll progress through the
 * MotionValue handed down by the parent, and travels on its own axis: a
 * horizontal percentage of its own width, plus a small vertical drift.
 * Because both are percentages of the line itself, the choreography holds
 * identically on a 375px phone and a 1920px display.
 *
 * Every value on the scroll path is a MotionValue — there is no React
 * state, so scrubbing never re-renders.
 */
function KineticRow({
  line,
  progress,
  reduced
}: {
  line: KineticLine
  progress: MotionValue<number>
  reduced: boolean
}) {
  const x = useTransform(
    progress,
    [0, 1],
    reduced ? ['0%', '0%'] : [`${line.from}%`, `${line.to}%`]
  )
  const y = useTransform(
    progress,
    [0, 1],
    reduced || !line.drift ? ['0%', '0%'] : [`${line.drift}%`, `${-line.drift}%`]
  )

  return (
    <div
      className={`w-full ${TEXT_ALIGN[line.align]}`}
      style={{ paddingLeft: line.indent ? `${line.indent}%` : undefined }}
    >
      <motion.span
        data-kinetic
        style={{ x, y }}
        className="t-kinetic inline-block will-change-transform"
      >
        {line.lead}
        {line.em ? (
          <>
            {' '}
            <span className="em text-accent">{line.em}</span>
          </>
        ) : null}
        {line.tail ?? ''}
      </motion.span>
    </div>
  )
}

/**
 * The kinetic typography installation (spec §09).
 *
 * A tall block — 190svh on small screens, 260svh on desktop — holds a
 * sticky viewport in which three oversized lines are scrubbed horizontally
 * against the reader's scroll: out, back, then out again, each at its own
 * speed and standing on its own edge.
 *
 * `offset: ['start start', 'end end']` means the travel only begins once
 * the block has pinned, so the whole movement happens on screen rather
 * than half of it happening off the bottom as it approaches.
 *
 * The visual block is decorative; the sentence is exposed once as real
 * text so it survives reduced motion, screen readers and search.
 */
export default function ScrollTextLines() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  })

  /* Spring the progress value itself, before the transforms, so the three
     lines share one smoothed velocity instead of three springs fighting. */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.4,
    restDelta: 0.0005
  })

  const barScale = useTransform(smooth, [0, 1], reduced ? [1, 1] : [0.015, 1])

  return (
    <div ref={ref} className="relative h-[190svh] md:h-[260svh]">
      {/* The real sentence — visible to AT, search and reduced motion */}
      <p className="sr-only">{kinetic.caption}</p>

      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        {/* Eyebrow, pinned above the type */}
        <div className="shell absolute inset-x-0 top-0" aria-hidden="true">
          <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4 pt-[calc(var(--nav-h)+1.25rem)]">
            <p className="sec-label">
              <span className="n">( 09 )</span>
              <span>{kinetic.label}</span>
            </p>
            <p className="t-meta hidden sm:block">Keep scrolling</p>
          </div>
        </div>

        <div className="shell flex flex-col gap-[0.5vh] md:gap-[1.2vh]" aria-hidden="true">
          {kineticLines.map((line) => (
            <KineticRow key={line.lead} line={line} progress={smooth} reduced={reduced} />
          ))}
        </div>

        {/* Progress hairline — tells the reader the installation is finite */}
        <div className="shell absolute inset-x-0 bottom-9 md:bottom-12" aria-hidden="true">
          <div className="h-px w-full bg-line">
            <motion.div className="h-px origin-left bg-accent" style={{ scaleX: barScale }} />
          </div>
        </div>
      </div>
    </div>
  )
}
