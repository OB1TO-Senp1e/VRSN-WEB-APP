import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { processStages } from '../data/content'
import { EASE, fadeUp, viewportOnce } from '../lib/motion'
import { useDesktop } from '../hooks/useMedia'

/**
 * How the studio works. On desktop the steps scroll past a sticky
 * media column that cross-fades to the active step — the only place
 * on the page where scroll position drives imagery. On touch it
 * collapses to a plain editorial list, no stickiness.
 */
export default function Process() {
  const desktop = useDesktop()
  const [active, setActive] = useState(0)
  const stepsRef = useRef<HTMLOListElement>(null)

  /* Track which step is crossing the reading line. */
  useEffect(() => {
    if (!desktop) return
    const nodes = stepsRef.current?.querySelectorAll<HTMLElement>('[data-step]')
    if (!nodes?.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.step)
            if (!Number.isNaN(i)) setActive(i)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [desktop])

  return (
    <section
      id="process"
      className="section relative border-t border-line"
      aria-label="How we work"
    >
      <div className="shell">
        {/* Header */}
        <div className="grid gap-9 md:grid-cols-12 md:gap-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="sec-label md:col-span-3"
          >
            <span className="n">( 06 )</span>
            <span>Process</span>
          </motion.p>

          <div className="md:col-span-9">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="t-display"
            >
              HOW THE
              <br />
              WORK <span className="em">Happens</span>.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="t-body mt-8 max-w-[42ch] md:mt-10"
            >
              Five moves, run in plain sight. No black boxes, no long silences —
              you see the work while it is still becoming the work.
            </motion.p>
          </div>
        </div>

        <div className="mt-16 md:mt-24 md:grid md:grid-cols-12 md:gap-10">
          {/* Sticky media column (desktop only) */}
          {desktop && (
            <div className="md:col-span-5">
              <div className="sticky top-[calc(var(--nav-h)+3rem)]">
                <div className="frame aspect-[4/5]">
                  {processStages.map((s, i) => (
                    <motion.img
                      key={s.index}
                      src={s.image}
                      alt={active === i ? s.alt : ''}
                      aria-hidden={active === i ? undefined : true}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 size-full object-cover"
                      initial={false}
                      animate={{ opacity: active === i ? 1 : 0 }}
                      transition={{ duration: 0.9, ease: EASE }}
                    />
                  ))}
                </div>
                <p className="t-meta mt-4 flex justify-between">
                  <span>Step {processStages[active].index}</span>
                  <span>{processStages[active].title}</span>
                </p>
              </div>
            </div>
          )}

          {/* Steps */}
          <ol
            ref={stepsRef}
            className={`border-t border-line ${desktop ? 'md:col-span-6 md:col-start-7' : ''}`}
          >
            {processStages.map((stage, i) => (
              <motion.li
                key={stage.index}
                data-step={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
                className={`group border-b border-line ${
                  desktop
                    ? 'flex min-h-[62vh] flex-col justify-center py-14'
                    : 'py-8 md:py-10'
                }`}
              >
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span
                    className={`t-index shrink-0 transition-colors duration-700 ${
                      desktop && active === i ? 'text-accent' : ''
                    }`}
                  >
                    {stage.index}
                  </span>
                  <h3
                    className={`t-row transition-colors duration-700 ${
                      desktop
                        ? active === i
                          ? 'text-fg'
                          : 'text-muted-2'
                        : 'text-fg'
                    }`}
                  >
                    {stage.title}
                  </h3>
                </div>
                <p className="t-body-sm ml-[2.5rem] mt-4 max-w-[46ch] md:ml-[5.5rem] md:mt-5">
                  {stage.body}
                </p>

                {/* Media inline on touch */}
                {!desktop && (
                  <div className="frame ml-[2.5rem] mt-6 aspect-[16/10] md:ml-[5.5rem]">
                    <img
                      src={stage.image}
                      alt={stage.alt}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                  </div>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
