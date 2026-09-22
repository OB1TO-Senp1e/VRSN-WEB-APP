import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import { hero, studio } from '../data/content'
import EditorialLink from '../components/EditorialLink'

/** Entrance choreography — seconds after the preloader lifts. */
const CUE = {
  label: 0.45,
  headline: 0.6,
  copy: 1.55,
  cta: 1.7,
  image: 1.15,
  scroll: 2.1
} as const

/**
 * The opening statement. Typography is the only visual: a small studio
 * label, a headline that owns the viewport, a short positioning column
 * and one editorial CTA. A single tall image stands off the right edge
 * on wide screens as a texture — never a "hero illustration".
 */
export default function Hero({ ready }: { ready: boolean }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 0.2])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '12%'])

  const show = (delay: number, y = 14) => ({
    initial: { opacity: 0, y },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 1, ease: EASE, delay }
  })

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden pb-6 pt-28 md:pb-8"
      aria-label="Introduction"
    >
      {/* Standing image — a texture at the right edge, wide screens only */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[var(--gutter)] top-[18vh] hidden w-[22vw] max-w-[22rem] lg:block"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={ready ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
        transition={{ duration: 1.4, ease: EASE, delay: CUE.image }}
      >
        <motion.div className="frame aspect-[4/5]" style={{ y: imageY }}>
          <img
            src="/images/studio-detail.jpg"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover"
          />
        </motion.div>
        <motion.p {...show(CUE.image + 0.6, 6)} className="t-meta mt-3 flex justify-between">
          <span>Studio, {new Date().getFullYear()}</span>
          <span>Fig. 01</span>
        </motion.p>
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="shell relative w-full">
        {/* Label */}
        <motion.p {...show(CUE.label)} className="sec-label mb-8 md:mb-12">
          <span className="n">( {studio.name}{studio.mark} )</span>
          <span>{hero.label}</span>
          <span className="hidden sm:inline">— {studio.disciplines}</span>
        </motion.p>

        {/* The statement */}
        <h1 className="t-hero">
          {hero.headline.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-[0.06em] pr-[0.06em]">
              <motion.span
                className="block will-change-transform"
                initial={{ y: '112%' }}
                animate={ready ? { y: '0%' } : { y: '112%' }}
                transition={{ duration: 1.35, ease: EASE, delay: CUE.headline + i * 0.12 }}
              >
                {line.em ? (
                  <>
                    <span className="em text-accent">{line.em}</span>
                    {line.text.replace(line.em.toUpperCase(), '')}
                  </>
                ) : (
                  line.text
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Positioning + CTA, on the baseline */}
        <div className="mt-10 grid gap-8 border-t border-line pt-6 md:mt-14 md:grid-cols-12 md:gap-10 md:pt-7">
          <motion.p {...show(CUE.copy)} className="t-meta md:col-span-3">
            Brand identity
            <br />
            Digital experience
            <br />
            Motion
          </motion.p>

          <motion.p {...show(CUE.copy + 0.05)} className="t-body max-w-[40ch] md:col-span-5">
            {hero.positioning}
          </motion.p>

          <motion.div
            {...show(CUE.cta)}
            className="flex items-start md:col-span-4 md:justify-end lg:col-span-3 lg:col-start-10"
          >
            <EditorialLink href="#contact" size="md" magnetic cursor="talk">
              {hero.cta}
            </EditorialLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="shell mt-10 hidden items-baseline justify-between md:mt-16 md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: EASE, delay: CUE.scroll }}
        aria-hidden="true"
      >
        <span className="t-meta">{studio.location}</span>
        <span className="t-meta flex items-center gap-3">
          Scroll
          <span className="relative block h-px w-14 overflow-hidden bg-line-strong">
            <motion.span
              className="absolute inset-y-0 left-0 block w-1/3 bg-ink"
              animate={reduced ? undefined : { x: ['-110%', '330%'] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            />
          </span>
        </span>
      </motion.div>
    </section>
  )
}
