import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import { hero, studio } from '../data/content'
import EditorialLink from '../components/EditorialLink'

/**
 * Entrance choreography, in seconds after the preloader lifts.
 * Order: label → headline → description → CTA → scroll indicator.
 */
const CUE = {
  label: 0.4,
  headline: 0.54,
  copy: 1.5,
  cta: 1.62,
  scroll: 2.0
} as const

/**
 * The opening statement — typography only, no illustration, no button
 * pair. A small studio label, a headline that owns the viewport, then a
 * baseline row carrying the disciplines, the positioning line and one
 * editorial CTA.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0.12])

  const show = (delay: number, dist = 16) => ({
    initial: { opacity: 0, y: dist },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: dist },
    transition: { duration: 1, ease: EASE, delay }
  })

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pb-8 pt-[calc(var(--nav-h)+2.5rem)] md:pb-10 md:pt-[calc(var(--nav-h)+4.5rem)]"
      aria-label="Introduction"
    >
      <motion.div style={{ y, opacity }} className="shell relative w-full">
        {/* Studio label */}
        <motion.p {...show(CUE.label)} className="sec-label mb-10 md:mb-14">
          <span className="n">
            ( {studio.name}
            {studio.mark} )
          </span>
          <span>{hero.label}</span>
        </motion.p>

        {/* The statement — owns most of the viewport */}
        <h1 className="t-hero">
          {hero.headline.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-[0.06em] pr-[0.08em]">
              <motion.span
                className="block will-change-transform"
                initial={{ y: '112%' }}
                animate={ready ? { y: '0%' } : { y: '112%' }}
                transition={{ duration: 1.35, ease: EASE, delay: CUE.headline + i * 0.11 }}
              >
                {line.em ? (
                  <>
                    <span className="em text-accent">{line.em}</span>
                    {line.text.slice(line.em.length).toLowerCase()}
                  </>
                ) : (
                  line.text
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Baseline: disciplines · positioning · CTA */}
        <div className="mt-12 grid gap-9 border-t border-line pt-7 md:mt-16 md:grid-cols-12 md:gap-10 md:pt-8">
          <motion.ul {...show(CUE.copy)} className="t-meta space-y-1 md:col-span-3">
            {hero.disciplines.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </motion.ul>

          <motion.p
            {...show(CUE.copy + 0.06)}
            className="t-body max-w-[44ch] md:col-span-6 md:col-start-5"
          >
            {hero.positioning}
          </motion.p>

          <motion.div
            {...show(CUE.cta)}
            className="md:col-span-2 md:col-start-11 md:justify-self-end"
          >
            <EditorialLink href="#contact" size="md" magnetic cursor="talk">
              {hero.cta}
            </EditorialLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="shell mt-14 hidden items-baseline justify-between border-t border-line pt-5 md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: EASE, delay: CUE.scroll }}
        aria-hidden="true"
      >
        <span className="t-meta">{studio.location}</span>
        <span className="t-meta flex items-center gap-3">
          Scroll
          <span className="relative block h-px w-16 overflow-hidden bg-line-strong">
            <motion.span
              className="absolute inset-y-0 left-0 block w-1/3 bg-accent"
              animate={reduced ? undefined : { x: ['-130%', '330%'] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            />
          </span>
        </span>
      </motion.div>
    </section>
  )
}
