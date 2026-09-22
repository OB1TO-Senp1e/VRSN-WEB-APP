import { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView } from 'framer-motion'
import { stats, studio, processStages, type Stat } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import RevealText from '../components/RevealText'
import ImageReveal from '../components/ImageReveal'
import EditorialLink from '../components/EditorialLink'

/** Counter that resolves once, when scrolled into view (spec §11). */
function Counter({ stat }: { stat: Stat }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [value, setValue] = useState(reduced ? stat.value : 0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, stat.value, {
      duration: 1.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v))
    })
    return () => controls.stop()
  }, [inView, reduced, stat.value])

  return (
    <span
      ref={ref}
      className="display block text-[clamp(2.75rem,7vw,5rem)] tabular-nums text-bone"
    >
      {String(value).padStart(2, '0')}
      <span className="text-accent">{stat.suffix}</span>
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 lg:py-40" aria-label="About the studio">
      <div className="shell">
        {/* Header */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="eyebrow mb-7 md:mb-10"
        >
          <span className="text-accent">04</span>
          <span className="px-3 text-[var(--muted-2)]">/</span>
          Studio
        </motion.p>

        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Headline */}
          <div className="md:col-span-7">
            <RevealText
              as="h2"
              className="t-display text-bone"
              lines={[
                'WE MAKE',
                'BRANDS',
                <>
                  <span className="t-em pr-[0.06em] text-accent">Matter</span>.
                </>
              ]}
            />
          </div>

          {/* Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="md:col-span-4 md:col-start-9 md:pt-4"
          >
            <motion.p variants={fadeUp} className="t-body">
              Great work comes from fewer, deeper collaborations — not a
              production line. We keep the team small, the process honest and
              the standard uncomfortable.
            </motion.p>
            <motion.p variants={fadeUp} className="t-body mt-6">
              If it does not move the work forward, we cut it. That applies to
              features, pages, meetings and ideas — including our own.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9">
              <EditorialLink href="#contact" size="md" cursor="talk">
                Work with us
              </EditorialLink>
            </motion.div>
          </motion.div>
        </div>

        {/* Image + approach — asymmetric pairing */}
        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <ImageReveal
              src="/images/about-studio.jpg"
              alt="Monochrome geometric architecture — the visual language of the VRSN studio"
              aspect="aspect-[4/3] md:aspect-[4/5]"
              parallax={7}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="t-meta mt-4"
            >
              Studio — {studio.location}
            </motion.p>
          </div>

          {/* Approach as a numbered editorial list, not cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="md:col-span-6 md:col-start-7 md:pt-6"
          >
            <motion.p variants={fadeUp} className="t-meta mb-8">
              How we work
            </motion.p>
            <ol className="border-t border-[var(--border)]">
              {processStages.map((stage) => (
                <motion.li
                  key={stage.index}
                  variants={fadeUp}
                  className="group grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-[var(--border)] py-6 md:grid-cols-[3rem_1fr] md:gap-x-6 md:py-7"
                >
                  <span className="t-index pt-1 text-bone-faint transition-colors duration-500 group-hover:text-accent">
                    {stage.index}
                  </span>
                  <div>
                    <h3 className="display text-[1.375rem] text-bone md:text-[1.625rem]">
                      {stage.title}
                    </h3>
                    <p className="mt-2 max-w-[54ch] text-[0.9375rem] leading-relaxed text-bone-dim">
                      {stage.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-[var(--border)] pt-12 md:mt-28 md:grid-cols-4 md:pt-14"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <dd>
                <Counter stat={s} />
              </dd>
              <dt className="t-meta mt-3">{s.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
