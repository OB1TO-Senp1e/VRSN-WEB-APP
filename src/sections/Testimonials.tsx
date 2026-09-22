import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '../data/content'
import { fadeUp, viewportOnce, EASE } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'

const ROTATE_MS = 6000

/** Minimal rotating testimonial with oversized quotation. */
export default function Testimonials() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback((i: number) => {
    setIndex((i + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (reduced) return
    timer.current = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), ROTATE_MS)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [reduced, index])

  const t = testimonials[index]

  return (
    <section className="relative px-6 py-28 md:px-10 md:py-40" aria-label="Client testimonials">
      <div className="mx-auto max-w-5xl">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="eyebrow mb-14 flex items-baseline gap-4"
        >
          <span className="text-accent">05</span>
          <span className="h-px w-10 self-center bg-[rgba(242,239,233,0.22)]" aria-hidden="true" />
          What clients say
        </motion.p>

        <div className="relative min-h-[280px] md:min-h-[320px]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="display text-[clamp(1.6rem,4vw,3.2rem)] leading-[1.15] text-bone">
                <span className="text-accent" aria-hidden="true">“</span>
                {t.quote}
                <span className="text-accent" aria-hidden="true">”</span>
              </p>
              <footer className="mt-10 flex items-center gap-5">
                <span
                  className="grid size-12 place-items-center rounded-full border border-[rgba(242,239,233,0.18)] font-mono text-sm text-accent"
                  aria-hidden="true"
                >
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </span>
                <div>
                  <p className="text-sm font-semibold text-bone">{t.name}</p>
                  <p className="text-xs tracking-wide text-bone-faint">
                    {t.role} — {t.company}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center gap-3" role="tablist" aria-label="Select testimonial">
          {testimonials.map((tt, i) => (
            <button
              key={tt.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial from ${tt.name}`}
              onClick={() => go(i)}
              className="group flex h-8 items-center"
            >
              <span
                className={`block h-[2px] rounded-full transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                  i === index ? 'w-12 bg-accent' : 'w-6 bg-[rgba(242,239,233,0.22)] group-hover:bg-[rgba(242,239,233,0.5)]'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
