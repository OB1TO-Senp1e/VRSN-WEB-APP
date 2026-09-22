import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '../data/content'
import { EASE, fadeUp, viewportOnce } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'

const ROTATE_MS = 7000

/**
 * A single oversized quote on the warm-white band — the one inverted
 * chapter in the page, used to reset the eye before the close.
 */
export default function Testimonials() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback((i: number) => {
    setIndex((i + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (reduced || paused) return
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      ROTATE_MS
    )
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [reduced, paused])

  const t = testimonials[index]

  return (
    <section
      className="invert-band relative py-24 md:py-32 lg:py-40"
      aria-label="Words from clients"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="shell">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex items-baseline justify-between gap-6 border-b border-[rgba(11,11,12,0.14)] pb-5"
        >
          <p className="eyebrow">Words from clients</p>
          <p className="t-index tabular-nums opacity-60">
            {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </p>
        </motion.div>

        <div className="relative mt-12 min-h-[19rem] md:mt-16 md:min-h-[21rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <p className="t-statement max-w-[24ch] text-ink md:max-w-[26ch]">
                {t.quote}
              </p>
              <footer className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 md:mt-12">
                <span className="text-[0.9375rem] font-semibold text-ink">{t.name}</span>
                <span className="t-meta">
                  {t.role} — {t.company}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Controls — rules, not dots */}
        <div
          className="mt-4 flex items-center gap-2"
          role="tablist"
          aria-label="Select quote"
        >
          {testimonials.map((tt, i) => (
            <button
              key={tt.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Quote from ${tt.name}, ${tt.company}`}
              onClick={() => go(i)}
              className="group flex h-9 items-center"
            >
              <span
                className={`block h-[2px] transition-all duration-[800ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                  i === index
                    ? 'w-14 bg-[#0b0b0c]'
                    : 'w-7 bg-[rgba(11,11,12,0.22)] group-hover:bg-[rgba(11,11,12,0.5)]'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
