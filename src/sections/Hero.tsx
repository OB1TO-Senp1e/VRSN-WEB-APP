import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform
} from 'framer-motion'
import { lineReveal, fadeUp, EASE } from '../lib/motion'
import { useFinePointer, usePrefersReducedMotion } from '../hooks/useMedia'
import Button from '../components/Button'

const HEADLINE: string[][] = [
  ['We', 'craft'],
  ['digital', 'worlds'],
  ['worth', 'remembering.']
]

/**
 * Cinematic hero: masked line-by-line headline reveal, mouse-reactive
 * gradient orbs, floating meta chips, and scroll-out parallax.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)

  // Mouse-reactive background
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 50, damping: 20 })
  const smy = useSpring(my, { stiffness: 50, damping: 20 })
  const orbX = useTransform(smx, (v) => v * 60)
  const orbY = useTransform(smy, (v) => v * 60)
  const orbX2 = useTransform(smx, (v) => v * -40)
  const orbY2 = useTransform(smy, (v) => v * -40)

  // Scroll-out parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const onMouseMove = (e: React.MouseEvent) => {
    if (!fine || reduced) return
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const anim = ready ? 'visible' : 'hidden'

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pt-24 md:px-10"
      onMouseMove={onMouseMove}
      aria-label="Introduction"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute left-[8%] top-[18%] size-[45vmax] rounded-full opacity-[0.12] blur-[110px]"
          style={{ x: orbX, y: orbY, background: 'radial-gradient(circle, #c9a876 0%, transparent 65%)' }}
          animate={reduced ? undefined : { scale: [1, 1.12, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[5%] right-[2%] size-[38vmax] rounded-full opacity-[0.08] blur-[100px]"
          style={{ x: orbX2, y: orbY2, background: 'radial-gradient(circle, #7a8aa0 0%, transparent 65%)' }}
          animate={reduced ? undefined : { scale: [1.08, 1, 1.08] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Fine grid lines */}
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(242,239,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(242,239,233,0.03)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative mx-auto w-full max-w-7xl">
        {/* Meta line */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={anim}
          custom={0}
          className="eyebrow mb-8 flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
          Independent creative studio
          <span className="hidden text-bone-faint sm:inline">/</span>
          <span className="hidden sm:inline">Brand × Web × Motion</span>
        </motion.p>

        {/* Headline with per-line mask reveal */}
        <h1 className="display text-[clamp(3rem,10.5vw,9.5rem)] text-bone">
          {HEADLINE.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block will-change-transform"
                variants={lineReveal}
                initial="hidden"
                animate={anim}
                custom={i}
              >
                {line.map((word, w) => (
                  <span key={w} className={word === 'worlds' ? 'text-accent italic font-serif font-medium' : ''}>
                    {word}
                    {w < line.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Support + CTAs */}
        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={anim}
            custom={4}
            className="max-w-md text-base leading-relaxed text-bone-dim md:text-lg"
          >
            VRSN is a studio for ambitious brands — building identities, websites and
            motion systems that turn ideas into something unforgettable.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={anim}
            custom={5}
            className="flex flex-wrap items-center gap-4"
          >
            <Button href="#contact">Start a project</Button>
            <Button href="#work" variant="ghost">
              View work
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating chip */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-[22%] hidden rounded-full border border-[rgba(242,239,233,0.12)] bg-[rgba(16,16,18,0.6)] px-4 py-2 text-[11px] tracking-[0.2em] text-bone-dim backdrop-blur-md lg:block"
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 1, ease: EASE }}
        style={reduced ? undefined : { x: orbX2, y: orbY2 }}
      >
        EST. 2016 — WORLDWIDE
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#work"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] tracking-[0.3em] text-bone-faint md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
        aria-label="Scroll to work"
      >
        SCROLL
        <motion.span
          className="block h-8 w-px bg-gradient-to-b from-bone-faint to-transparent"
          animate={reduced ? undefined : { scaleY: [1, 0.5, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      </motion.a>
    </section>
  )
}
