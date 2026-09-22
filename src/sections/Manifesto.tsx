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
  const start = (index / total) * 0.75
  const end = start + 0.22
  const opacity = useTransform(progress, [start, end], reduced ? [1, 1] : [0.16, 1])
  return (
    <motion.span
      style={{ opacity }}
      className={emphasis ? 'em text-accent' : undefined}
    >
      {word}{' '}
    </motion.span>
  )
}

/**
 * Editorial manifesto. A three-line claim at display scale, then a
 * running paragraph whose words resolve from muted to ink as the reader
 * scrolls — the text literally comes into focus.
 */
export default function Manifesto() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })

  const words = manifesto.text.split(' ')
  const isEm = (w: string) => manifesto.emphasis.some((e) => w.toLowerCase().startsWith(e))

  return (
    <section ref={ref} className="shell section relative" aria-label="Manifesto">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        {/* Label */}
        <p className="sec-label md:col-span-3">
          <span className="n">( 01 )</span>
          <span>Manifesto</span>
        </p>

        <div className="md:col-span-9">
          <h2 className="t-display">
            {manifesto.lines.map((line, i) => {
              const em = manifesto.em && line.startsWith(manifesto.em.toUpperCase())
              const start = 0.02 + i * 0.08
              return (
                <Line
                  key={line}
                  progress={scrollYProgress}
                  range={[start, start + 0.22]}
                  reduced={reduced}
                >
                  {em ? (
                    <>
                      <span className="em">{manifesto.em}</span>
                      {line.replace(manifesto.em!.toUpperCase(), '')}
                    </>
                  ) : (
                    line
                  )}
                </Line>
              )
            })}
          </h2>

          <p className="t-statement mt-14 max-w-[26ch] md:mt-20 md:ml-[25%] md:max-w-[24ch]">
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
  const y = useTransform(progress, range, reduced ? ['0%', '0%'] : ['105%', '0%'])
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span className="block will-change-transform" style={{ y }}>
        {children}
      </motion.span>
    </span>
  )
}
