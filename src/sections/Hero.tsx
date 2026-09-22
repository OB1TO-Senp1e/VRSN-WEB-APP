import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE, imageReveal, imageSettle } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import { hero, studio } from '../data/content'
import EditorialLink from '../components/EditorialLink'

/**
 * Entrance choreography, in seconds after the preloader lifts.
 * The order is the hierarchy: label → headline → the visual → supporting
 * copy → the scroll cue. Nothing arrives at the same moment as anything
 * else, and nothing arrives before what it depends on.
 */
const CUE = {
  label: 0.30,
  headline: 0.46,
  visual: 0.96,
  copy: 1.44,
  cta: 1.58,
  strip: 1.86
} as const

/**
 * The opening statement.
 *
 * A three-line headline at display scale takes the left nine columns; a
 * single tall photograph holds the right margin and reveals last, so the
 * page reads as a printed spread rather than a landing page. The baseline
 * row carries the disciplines, the positioning and one editorial CTA.
 * There is no button pair, no illustration, no decorative motion.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80])
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, reduced ? 1 : 0.1])

  const show = (delay: number, dist = 16) => ({
    initial: { opacity: 0, y: dist },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: dist },
    transition: { duration: 1, ease: EASE, delay }
  })

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pb-7 pt-[calc(var(--nav-h)+2.25rem)] md:pb-9 md:pt-[calc(var(--nav-h)+4rem)]"
      aria-label="Introduction"
    >
      <motion.div
        style={{ y, opacity }}
        className="shell grid w-full grid-cols-12 gap-x-6 gap-y-10 md:gap-x-10"
      >
        {/* Label row — who we are, and where we are */}
        <motion.div
          {...show(CUE.label, 10)}
          className="col-span-12 flex items-baseline justify-between gap-6 border-b border-line pb-4 md:pb-5"
        >
          <p className="sec-label">
            <span className="n">
              ( {studio.name}
              {studio.mark} )
            </span>
            <span>{hero.label}</span>
          </p>
          <p className="t-meta hidden text-right sm:block">{studio.disciplines}</p>
        </motion.div>

        {/* The statement — owns the left nine columns */}
        <h1 className="t-hero col-span-12 lg:col-span-9">
          {hero.headline.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-[0.055em] pr-[0.06em]">
              <motion.span
                className="block will-change-transform"
                initial={{ y: '112%' }}
                animate={ready ? { y: '0%' } : { y: '112%' }}
                transition={{ duration: 1.35, ease: EASE, delay: CUE.headline + i * 0.1 }}
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

        {/* The visual — one photograph, held in the right margin.
            On mobile it drops below the type as a wide band instead. */}
        <motion.figure
          variants={imageReveal}
          initial="hidden"
          animate={ready ? 'visible' : 'hidden'}
          transition={{ delay: CUE.visual }}
          className="col-span-12 sm:col-span-7 md:col-span-6 lg:col-span-3 lg:col-start-10 lg:self-end lg:pb-2"
        >
          <div className="frame aspect-[16/10] sm:aspect-[3/2] lg:aspect-[3/4]">
            <motion.img
              src={hero.visual.src}
              alt={hero.visual.alt}
              variants={imageSettle}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              sizes="(max-width: 1023px) 100vw, 24vw"
              className="size-full object-cover"
            />
          </div>
          <figcaption className="t-meta mt-3 flex items-baseline justify-between gap-4">
            <span>{hero.visual.alt.split(' — ')[0].split(',')[0]}</span>
            <span className="text-accent">{studio.founded}</span>
          </figcaption>
        </motion.figure>

        {/* Baseline: disciplines · positioning · CTA */}
        <div className="col-span-12 mt-2 grid grid-cols-12 items-start gap-x-6 gap-y-8 border-t border-line pt-7 md:mt-4 md:gap-x-10 md:pt-8">
          <motion.ul {...show(CUE.copy)} className="t-meta col-span-12 space-y-1.5 sm:col-span-4 lg:col-span-3">
            {hero.disciplines.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </motion.ul>

          <motion.p
            {...show(CUE.copy + 0.06)}
            className="t-body col-span-12 max-w-[46ch] sm:col-span-8 lg:col-span-5 lg:col-start-5"
          >
            {hero.positioning}
          </motion.p>

          <motion.div
            {...show(CUE.cta)}
            className="col-span-12 sm:col-span-12 lg:col-span-3 lg:col-start-10 lg:justify-self-end"
          >
            <EditorialLink href="#contact" size="md" magnetic cursor="talk">
              {hero.cta}
            </EditorialLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Baseline strip — the studio's facts and the scroll cue */}
      <motion.div
        className="shell mt-12 flex items-baseline justify-between gap-6 border-t border-line pt-4 md:mt-14 md:pt-5"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: EASE, delay: CUE.strip }}
      >
        <dl className="hidden items-baseline gap-8 md:flex lg:gap-14">
          {hero.meta.map((m) => (
            <div key={m.label} className="flex items-baseline gap-2.5">
              <dt className="t-meta">{m.label}</dt>
              <dd className="t-meta text-fg">{m.value}</dd>
            </div>
          ))}
        </dl>

        <span className="t-meta md:hidden">{studio.location}</span>

        <span className="t-meta flex items-center gap-3" aria-hidden="true">
          Scroll
          <span className="relative block h-px w-14 overflow-hidden bg-line-strong md:w-20">
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
