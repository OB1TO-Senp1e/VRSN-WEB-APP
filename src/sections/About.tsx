import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion'
import { stats, type Stat } from '../data/content'
import { fadeUp, imageReveal, staggerContainer, viewportOnce } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import SectionHeading from '../components/SectionHeading'

/** Animated counter that counts up when scrolled into view. */
function Counter({ stat }: { stat: Stat }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [display, setDisplay] = useState(reduced ? stat.value : 0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, stat.value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v))
    })
    return () => controls.stop()
  }, [inView, reduced, stat.value])

  return (
    <span ref={ref} className="display text-[clamp(3rem,6vw,5.5rem)] text-bone tabular-nums">
      {display}
      <span className="text-accent">{stat.suffix}</span>
    </span>
  )
}

export default function About() {
  const reduced = usePrefersReducedMotion()
  const imgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-8%', '8%'])

  return (
    <section id="about" className="relative px-6 py-28 md:px-10 md:py-40" aria-label="About the studio">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24">
          <SectionHeading number="03" label="The studio" title="Small team. Sharp work." />
        </div>

        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          {/* Statement */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="md:col-span-7"
          >
            <motion.p variants={fadeUp} className="display text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.25] text-bone">
              We believe great work comes from fewer, deeper collaborations — not a
              production line. Every project is led by the people who actually make it.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-8 max-w-xl text-base leading-relaxed text-bone-dim">
              Founded in 2016, VRSN is an independent practice working across brand,
              web and motion. We keep the team deliberately small, the process
              deliberately honest, and the standard deliberately uncomfortable. If it
              doesn't move the work forward, we cut it.
            </motion.p>
            <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs tracking-[0.2em] text-bone-faint">
              <li>STRATEGY-LED</li>
              <li>DESIGN-OBSESSED</li>
              <li>ENGINEERING-NATIVE</li>
            </motion.ul>
          </motion.div>

          {/* Parallax image */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="md:col-span-5"
          >
            <div ref={imgRef} className="img-frame relative aspect-[4/3] md:aspect-[3/4]">
              <motion.img
                src="/images/about-studio.jpg"
                alt="Monochrome geometric architecture — the visual language of the VRSN studio"
                loading="lazy"
                decoding="async"
                className="!h-[116%] w-full object-cover"
                style={{ y: imgY }}
              />
              <span className="absolute bottom-5 left-5 rounded-full border border-[rgba(242,239,233,0.18)] bg-[rgba(10,10,11,0.5)] px-3 py-1 text-[10px] tracking-[0.18em] text-bone backdrop-blur-md">
                STUDIO / WORLDWIDE
              </span>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-24 grid grid-cols-2 gap-y-14 border-t border-[rgba(242,239,233,0.1)] pt-14 md:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <dt className="order-2 mt-3 block text-xs tracking-[0.2em] text-bone-faint">
                {s.label.toUpperCase()}
              </dt>
              <dd className="order-1">
                <Counter stat={s} />
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
