import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import { statement } from '../data/content'
import RevealText from '../components/RevealText'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

/**
 * The large typographic statement. Enormous type, no container, and
 * the three lines stagger horizontally so the block reads as a
 * composition rather than a centred heading. On wide screens the
 * supporting copy sits under the last line's shoulder.
 */
export default function Statement() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['4%', '-4%'])

  return (
    <section ref={ref} className="section relative overflow-hidden" aria-label="Studio statement">
      <div className="shell">
        <motion.div style={{ x: drift }}>
          <RevealText
            as="h2"
            className="t-hero !text-[clamp(3.5rem,13vw,15rem)]"
            lines={[
              <span key="a" className="block">{statement.headline[0]}</span>,
              <span key="b" className="block md:pl-[12vw]">{statement.headline[1]}</span>,
              <span key="c" className="block md:pl-[24vw]">
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
          className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12 md:gap-10"
        >
          <motion.p variants={fadeUp} className="sec-label md:col-span-3">
            <span className="n">( 02 )</span>
            <span>Positioning</span>
          </motion.p>
          <div className="md:col-span-5 md:col-start-7">
            {statement.body.map((p) => (
              <motion.p key={p} variants={fadeUp} className="t-body [&+&]:mt-5">
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
