import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import { statement } from '../data/content'
import RevealText from '../components/RevealText'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

/**
 * The large typographic statement — the page's loudest moment, set on
 * ink. Enormous type with no container, lines stepped horizontally so
 * the block reads as a composition rather than a centred heading.
 */
export default function Statement() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['3%', '-3%'])

  return (
    <section
      ref={ref}
      data-theme="ink"
      className="chapter-ink section relative overflow-hidden"
      aria-label="Studio statement"
    >
      <div className="shell">
        <motion.div style={{ x: drift }}>
          <RevealText
            as="h2"
            className="t-mega"
            lines={[
              <span key="a" className="block">
                {statement.headline[0]}
              </span>,
              <span key="b" className="block md:pl-[14vw]">
                {statement.headline[1]}
              </span>,
              <span key="c" className="block md:pl-[28vw]">
                <span className="em text-accent">{statement.em}</span>.
              </span>
            ]}
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-8 md:mt-24 md:grid-cols-12 md:gap-10"
        >
          <motion.p variants={fadeUp} className="sec-label md:col-span-3">
            <span className="n">( 02 )</span>
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
