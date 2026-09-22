import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import { manifesto } from '../data/content'

/** One word of the running text, resolving from muted to foreground. */
function Word({
  word,
  index,
  total,
  progress,
  reduced,
  emphasis
}: {
  word: string
  index: number
  total: number
  progress: MotionValue<number>
  reduced: boolean
  emphasis: boolean
}) {
  const start = (index / total) * 0.72
  const end = start + 0.2
  const opacity = useTransform(progress, [start, end], reduced ? [1, 1] : [0.14, 1])
  return (
    <motion.span style={{ opacity }} className={emphasis ? 'em text-accent' : undefined}>
      {word}{' '}
    </motion.span>
  )
}

/** A masked claim line whose Y is driven by the section's own progress. */
function Line({
  children,
  progress,
  range,
  reduced
}: {
  children: React.ReactNode
  progress: MotionValue<number>
  range: [number, number]
  reduced: boolean
}) {
  const y = useTransform(progress, range, reduced ? ['0%', '0%'] : ['106%', '0%'])
  return (
    <span className="block overflow-hidden pb-[0.055em] pr-[0.04em]">
      <motion.span className="block will-change-transform" style={{ y }}>
        {children}
      </motion.span>
    </span>
  )
}

/**
 * The manifesto — the studio's argument.
 *
 * A bracketed marker, a three-line claim at display scale where each line
 * rises out of its own mask as you scroll, then a running paragraph whose
 * words resolve from muted to foreground. The text literally comes into
 * focus as the reader commits to it.
 *
 * Only the paragraph words and the claim lines are animated — nothing
 * else in the section moves, so the eye always knows where to go.
 */
export default function Manifesto() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 82%', 'end 58%'] })

  const words = manifesto.text.split(' ')
  const isEm = (w: string) => manifesto.emphasis.some((e) => w.toLowerCase().startsWith(e))

  return (
    <section ref={ref} className="shell section relative" aria-label="Manifesto">
      <div className="grid gap-10 md:grid-cols-12 md:gap-10">
        {/* Indicator + marker */}
        <div className="md:col-span-3">
          <p className="sec-label">
            <span className="n">( 01 )</span>
            <span>Manifesto</span>
          </p>

          <motion.p
            aria-hidden="true"
            className="mt-8 hidden font-mono text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-none text-accent md:block"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            [ ! ]
          </motion.p>
        </div>

        {/* Claim */}
        <div className="md:col-span-9">
          <h2 className="t-display">
            {manifesto.lines.map((line, i) => {
              const isLast = line.startsWith(manifesto.em.toUpperCase())
              const start = 0.02 + i * 0.09
              return (
                <Line
                  key={line}
                  progress={scrollYProgress}
                  range={[start, start + 0.24]}
                  reduced={reduced}
                >
                  {isLast ? (
                    <>
                      <span className="em text-accent">{manifesto.em}</span>
                      {line.replace(manifesto.em.toUpperCase(), '')}
                    </>
                  ) : (
                    line
                  )}
                </Line>
              )
            })}
          </h2>

          {/* Supporting copy — offset into the right margin so the claim
              and the argument never share a left edge. */}
          <p className="t-statement mt-14 max-w-[26ch] text-balance md:mt-24 md:ml-[30%] md:max-w-[24ch]">
            {words.map((w, i) => (
              <Word
                key={i}
                word={w}
                index={i}
                total={words.length}
                progress={scrollYProgress}
                reduced={reduced}
                emphasis={isEm(w)}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
