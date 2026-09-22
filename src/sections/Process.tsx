import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { processStages } from '../data/content'
import { EASE, fadeUp, viewportOnce } from '../lib/motion'
import { useDesktop } from '../hooks/useMedia'

/**
 * How the studio works.
 *
 * On desktop the five steps scroll past a sticky media column that
 * cross-fades to the active step, with a matching step indicator running
 * down the left edge — the active mark slides, the numerals warm up and
 * the media changes. This is the only place on the page where scroll
 * position drives imagery, which is what makes it feel like an event.
 *
 * On touch it collapses to a plain editorial list with the media inline,
 * no stickiness, no observers.
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
    <section id="process" className="section relative border-t border-line" aria-label="How we work">
      <div className="shell">
        {/* Header */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="sec-label md:col-span-3 md:self-start"
          >
            <span className="n">( 07 )</span>
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
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="t-body md:col-span-4 md:col-start-9 md:pt-3"
          >
            Five moves, run in plain sight. No black boxes, no long silences — you see the work
            while it is still becoming the work.
          </motion.p>
        </div>

        <div className="mt-14 md:mt-20 md:grid md:grid-cols-12 md:gap-10">
          {/* Sticky media + step indicator (desktop only) */}
          {desktop && (
            <div className="md:col-span-5">
              <div className="sticky top-[calc(var(--nav-h)+2.5rem)]">
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

                {/* Step indicator — numerals, with the active one marked */}
                <div className="mt-4 flex items-baseline justify-between gap-8">
                  <ol className="flex items-baseline gap-3" aria-hidden="true">
                    {processStages.map((s, i) => (
                      <li key={s.index} className="relative">
                        <span
                          className={`t-index transition-colors duration-500 ${
                            active === i ? 'text-accent' : 'text-muted-2'
                          }`}
                        >
                          {s.index}
                        </span>
                        {active === i && (
                          <motion.span
                            layoutId="process-mark"
                            className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent"
                            transition={{ duration: 0.6, ease: EASE }}
                          />
                        )}
                      </li>
                    ))}
                  </ol>
                  <p className="t-meta text-fg">{processStages[active].title}</p>
                </div>
              </div>
            </div>
          )}

          {/* Steps */}
          <ol
            ref={stepsRef}
            className={`border-t border-line ${desktop ? 'md:col-span-6 md:col-start-7' : ''}`}
          >
            {processStages.map((stage, i) => {
              const isActive = desktop && active === i
              return (
                <motion.li
                  key={stage.index}
                  data-step={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
                  className={`group border-b border-line ${
                    desktop ? 'flex min-h-[58vh] flex-col justify-center py-12' : 'py-7 md:py-9'
                  }`}
                >
                  <div className="flex items-baseline gap-5 md:gap-8">
                    <span
                      className={`t-index shrink-0 transition-colors duration-700 ${
                        isActive ? 'text-accent' : ''
                      }`}
                    >
                      {stage.index}
                    </span>
                    <h3
                      className={`t-row-sm transition-colors duration-700 ${
                        desktop ? (isActive ? 'text-fg' : 'text-muted-2') : 'text-fg'
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
                    <div className="frame ml-[2.5rem] mt-5 aspect-[16/10] md:ml-[5.5rem]">
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
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
