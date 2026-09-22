import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { lineReveal, ruleReveal, EASE } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import { studio } from '../data/content'
import EditorialLink from '../components/EditorialLink'

/**
 * The studio statement. Typography is the only visual — no orbs, no
 * gradients, no floating chrome. Asymmetric: the headline is set hard
 * to the left edge and the supporting column sits under its right
 * shoulder (spec §02).
 */
const HEADLINE = ['WE BUILD', 'BRANDS PEOPLE', 'REMEMBER.']

/** Entrance choreography (spec §03) — steps are in seconds. */
const CUE = {
  label: 0.55,
  headline: 0.72,
  rule: 1.5,
  copy: 1.62,
  cta: 1.78,
  visual: 1.9,
  scroll: 2.25
} as const

export default function Hero({ ready }: { ready: boolean }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)

  /* Scroll-out: content drifts and dims as the page takes over. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0.15])
  const stripY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-14%'])

  const state = ready ? 'visible' : 'hidden'
  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 1, ease: EASE, delay }
  })

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden pb-14 pt-32 md:pb-16 lg:min-h-[100svh]"
      aria-label="Introduction"
    >
      {/* Standing type specimen — an editorial texture, not a decoration */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[34vw] overflow-hidden lg:block"
        style={{ y: stripY }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.6, ease: EASE, delay: CUE.visual }}
      >
        <div className="frame absolute inset-y-0 right-0 w-full">
          <img
            src="/images/studio-detail.jpg"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover opacity-[0.28] grayscale"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #0b0b0c 0%, rgba(11,11,12,0.55) 38%, rgba(11,11,12,0.2) 100%)'
            }}
          />
        </div>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="shell relative w-full"
      >
        {/* Label row */}
        <motion.div {...anim(CUE.label)} className="mb-9 flex items-baseline gap-4 md:mb-12">
          <span className="eyebrow text-accent">{studio.positioning}</span>
          <span
            className="hidden h-px flex-1 max-w-[7rem] origin-left bg-[var(--border-strong)] sm:block"
            aria-hidden="true"
          />
          <span className="eyebrow hidden sm:block">{studio.disciplines}</span>
        </motion.div>

        {/* The statement */}
        <h1 className="t-hero text-bone">
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.045em]">
              <motion.span
                className="block will-change-transform"
                variants={lineReveal}
                initial="hidden"
                animate={state}
                custom={i}
                transition={{ duration: 1.35, ease: EASE, delay: CUE.headline + i * 0.13 }}
              >
                {line === 'REMEMBER.' ? (
                  <>
                    <span className="t-em pr-[0.06em] text-accent">Remember</span>.
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Rule */}
        <motion.div
          aria-hidden="true"
          className="mt-10 h-px origin-left bg-[var(--border)] md:mt-14"
          variants={ruleReveal}
          initial="hidden"
          animate={state}
          transition={{ duration: 1.2, ease: EASE, delay: CUE.rule }}
        />

        {/* Supporting column + CTA — offset right, asymmetric */}
        <div className="mt-8 grid gap-9 md:mt-10 md:grid-cols-12 md:items-start md:gap-10">
          <div className="md:col-span-1" aria-hidden="true" />

          <motion.p {...anim(CUE.copy)} className="t-body max-w-[38ch] md:col-span-5">
            We are an independent studio working across brand identity, digital
            experience and motion — building the version of a company people
            actually keep in their heads.
          </motion.p>

          <motion.div
            {...anim(CUE.cta)}
            className="flex flex-wrap items-center gap-x-10 gap-y-5 md:col-span-6 md:justify-end"
          >
            <EditorialLink href="#contact" size="lg" magnetic cursor="talk">
              Start a project
            </EditorialLink>
            <EditorialLink href="#work" size="md">
              Selected work
            </EditorialLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="shell pointer-events-none absolute inset-x-0 bottom-5 hidden items-baseline justify-between md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: EASE, delay: CUE.scroll }}
        aria-hidden="true"
      >
        <span className="t-meta">
          Est. {studio.founded} — {studio.location}
        </span>
        <span className="flex items-center gap-3 t-meta">
          Scroll
          <span className="relative block h-px w-14 overflow-hidden bg-[var(--border-strong)]">
            <motion.span
              className="absolute inset-y-0 left-0 block w-1/3 bg-accent"
              animate={reduced ? undefined : { x: ['-110%', '330%'] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            />
          </span>
        </span>
      </motion.div>
    </section>
  )
}
