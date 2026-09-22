import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { lineReveal, fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import Magnetic from '../components/Magnetic'

/** Dramatic closing CTA with ambient glow and giant magnetic button. */
export default function Contact() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const glowScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.7, 1.15])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.16])

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden px-6 py-32 md:px-10 md:py-48"
      aria-label="Start a project"
    >
      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
        style={{
          scale: glowScale,
          opacity: glowOpacity,
          background: 'radial-gradient(circle, #c9a876 0%, transparent 60%)'
        }}
      />

      <div className="relative mx-auto max-w-6xl text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="eyebrow mb-10 justify-center"
        >
          06 — Next chapter
        </motion.p>

        <h2 className="display text-[clamp(2.8rem,9vw,8rem)] text-bone">
          {['Have an idea', 'worth building?'].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block will-change-transform"
                variants={lineReveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={i}
              >
                {i === 1 ? (
                  <>
                    worth <span className="italic font-serif font-medium text-accent">building?</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 flex flex-col items-center gap-8"
        >
          <motion.div variants={fadeUp}>
            <Magnetic strength={0.3}>
              <a
                href="mailto:hello@vrsn.studio"
                className="group inline-flex items-center gap-4 rounded-full bg-bone px-10 py-5 text-base font-semibold text-ink transition-colors duration-500 hover:bg-accent md:px-14 md:py-6 md:text-lg"
              >
                Start a project
                <ArrowRight
                  className="size-5 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </a>
            </Magnetic>
          </motion.div>

          <motion.p variants={fadeUp} className="text-sm text-bone-faint">
            Or write to us directly —{' '}
            <a href="mailto:hello@vrsn.studio" className="u-link text-bone-dim hover:text-bone transition-colors">
              hello@vrsn.studio
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
