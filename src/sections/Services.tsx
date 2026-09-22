import { useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { services, serviceSummary, type Service } from '../data/content'
import { EASE, fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import { useFinePointer, usePrefersReducedMotion } from '../hooks/useMedia'
import RevealText from '../components/RevealText'

/**
 * One service as an oversized row (spec §09). On hover the row shifts,
 * the index switches to the accent, the description opens, and a small
 * image preview tracks the cursor.
 */
function ServiceRow({
  service,
  active,
  onEnter,
  onLeave,
  expanded,
  onToggle
}: {
  service: Service
  active: boolean
  onEnter: () => void
  onLeave: () => void
  expanded: boolean
  onToggle: () => void
}) {
  const fine = useFinePointer()
  const open = fine ? active : expanded
  const panelId = `service-panel-${service.index}`

  return (
    <motion.li
      variants={fadeUp}
      className="relative border-b border-[var(--border)]"
      onPointerEnter={fine ? onEnter : undefined}
      onPointerLeave={fine ? onLeave : undefined}
    >
      {/* Ground wash on hover — subtle, no glass, no shadow */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[calc(var(--gutter)*-1)] inset-y-0 bg-[#101011]"
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      <h3 className="relative">
        <button
          type="button"
          onClick={onToggle}
          onFocus={fine ? onEnter : undefined}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-baseline gap-5 py-7 text-left md:gap-9 md:py-9"
        >
          <span
            className={`t-index shrink-0 transition-colors duration-500 ${
              open ? 'text-accent' : 'text-bone-faint'
            }`}
          >
            {service.index}
          </span>
          <span className="flex-1">
            <motion.span
              className="t-row block"
              animate={{
                x: open ? (fine ? 18 : 8) : 0,
                color: open ? '#f2efe9' : '#8d8a84'
              }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {service.title}
            </motion.span>
          </span>
          <motion.span
            className="t-meta hidden shrink-0 md:block"
            animate={{ opacity: open ? 1 : 0, x: open ? 0 : 10 }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-hidden="true"
          >
            View →
          </motion.span>
          {/* Mobile affordance */}
          <motion.span
            className="shrink-0 text-lg leading-none text-bone-faint md:hidden"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            aria-hidden="true"
          >
            +
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative overflow-hidden"
          >
            <div className="grid gap-6 pb-8 pl-9 md:grid-cols-12 md:gap-10 md:pb-10 md:pl-[4.5rem]">
              <p className="t-body max-w-[52ch] !text-[1rem] md:col-span-6">
                {service.body}
              </p>
              <ul className="flex flex-col gap-1.5 md:col-span-4 md:col-start-8">
                {service.tags.map((t) => (
                  <li key={t} className="t-meta !tracking-[0.14em]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export default function Services() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  /* Cursor-tracked preview */
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spx = useSpring(px, { stiffness: 140, damping: 22, mass: 0.5 })
  const spy = useSpring(py, { stiffness: 140, damping: 22, mass: 0.5 })

  const onPointerMove = (e: React.PointerEvent) => {
    if (!fine || reduced || !listRef.current) return
    const r = listRef.current.getBoundingClientRect()
    px.set(e.clientX - r.left)
    py.set(e.clientY - r.top)
  }

  const showPreview = fine && !reduced && active !== null

  return (
    <section id="services" className="relative py-24 md:py-32 lg:py-40" aria-label="Services">
      <div className="shell">
        {/* Header */}
        <div className="grid gap-9 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="eyebrow mb-7 md:mb-10"
            >
              <span className="text-accent">03</span>
              <span className="px-3 text-[var(--muted-2)]">/</span>
              Services
            </motion.p>
            <RevealText as="h2" className="t-display text-bone" lines={['WHAT WE', 'DO.']} />
          </div>

          {/* Compact typographic summary (spec §10) */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-wrap gap-x-6 gap-y-1 md:col-span-4 md:col-start-9 md:flex-col md:gap-y-1.5"
            aria-label="Disciplines"
          >
            {serviceSummary.map((s) => (
              <motion.li
                key={s}
                variants={fadeUp}
                className="text-[0.9375rem] font-medium text-bone-dim md:text-base"
              >
                {s}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Rows */}
        <div ref={listRef} className="relative mt-14 md:mt-24" onPointerMove={onPointerMove}>
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="border-t border-[var(--border)]"
          >
            {services.map((s, i) => (
              <ServiceRow
                key={s.index}
                service={s}
                active={active === i}
                onEnter={() => setActive(i)}
                onLeave={() => setActive((cur) => (cur === i ? null : cur))}
                expanded={expanded === i}
                onToggle={() => setExpanded((cur) => (cur === i ? null : i))}
              />
            ))}
          </motion.ul>

          {/* Cursor-tracked image preview — desktop only */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                key={services[active!].index}
                aria-hidden="true"
                className="frame pointer-events-none absolute left-0 top-0 z-[5] aspect-[4/5] w-[14rem] xl:w-[16rem]"
                style={{ x: spx, y: spy, translateX: '-115%', translateY: '-50%' }}
                initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <img
                  src={services[active!].image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover grayscale"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
