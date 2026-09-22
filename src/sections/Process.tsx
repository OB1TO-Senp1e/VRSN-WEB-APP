import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { processStages } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import SectionHeading from '../components/SectionHeading'

/**
 * Sticky heading on the left, stages scroll past on the right.
 * A progress line fills as the user moves through the section.
 */
export default function Process() {
  const reduced = usePrefersReducedMotion()
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="relative bg-ink-2 px-6 py-28 md:px-10 md:py-40" aria-label="Our process">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-12">
        {/* Sticky left column */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <SectionHeading number="04" label="How we work" title="The process." />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-8 max-w-sm text-base leading-relaxed text-bone-dim"
            >
              Five stages. No black boxes. You see the work as it happens — and you
              always know exactly where we are.
            </motion.p>
          </div>
        </div>

        {/* Stages */}
        <div ref={listRef} className="relative md:col-span-7">
          {/* Progress rail */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-[rgba(242,239,233,0.1)] md:block" aria-hidden="true">
            {!reduced && (
              <motion.div
                className="w-full bg-accent"
                style={{ scaleY: lineScale, transformOrigin: 'top', height: '100%' }}
              />
            )}
          </div>

          <ol className="space-y-4 md:pl-14">
            {processStages.map((stage) => (
              <motion.li
                key={stage.index}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-18% 0px' }}
                className="group rounded-2xl border border-[rgba(242,239,233,0.08)] bg-[rgba(23,23,26,0.5)] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-[rgba(201,168,118,0.35)] md:p-9"
              >
                <motion.div variants={fadeUp} className="flex items-baseline gap-5">
                  <span className="font-mono text-sm text-accent">{stage.index}</span>
                  <h3 className="display text-2xl text-bone md:text-3xl">{stage.title}</h3>
                </motion.div>
                <motion.p variants={fadeUp} className="mt-4 text-[15px] leading-relaxed text-bone-dim">
                  {stage.body}
                </motion.p>
                <motion.ul variants={fadeUp} className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-[0.15em] text-bone-faint">
                  {stage.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <span className="size-1 rounded-full bg-accent/70" aria-hidden="true" />
                      {it.toUpperCase()}
                    </li>
                  ))}
                </motion.ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
