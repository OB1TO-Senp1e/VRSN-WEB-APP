import { useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { services, type Service } from '../data/content'
import { EASE, fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import { useDesktop, useFinePointer } from '../hooks/useMedia'
import RevealText from '../components/RevealText'

/**
 * One service as an oversized editorial row. On desktop hover the title
 * shifts, the index flips to the accent, the ground washes, and the
 * description opens beneath. On touch the row toggles on tap.
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
      className="relative border-b border-line"
      onPointerEnter={fine ? onEnter : undefined}
      onPointerLeave={fine ? onLeave : undefined}
    >
      {/* Ground wash on hover — subtle, no shadow */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[calc(var(--gutter)*-1)] inset-y-0 bg-paper-2"
        initial={false}
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
          className="grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-7 text-left md:grid-cols-[6rem_1fr_auto] md:gap-8 md:py-9"
        >
          <span
            className={`t-index transition-colors duration-500 ${
              open ? 'text-accent' : ''
            }`}
          >
            {open ? `(${service.index})` : service.index}
          </span>
          <motion.span
            className="t-row block"
            initial={false}
            animate={{ x: open ? (fine ? 22 : 8) : 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {service.title}
          </motion.span>
          <motion.span
            className="t-meta hidden md:block"
            initial={false}
            animate={{ opacity: open ? 1 : 0.4, x: open ? 0 : 10 }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-hidden="true"
          >
            {open ? 'Read →' : `${service.tags.length} areas`}
          </motion.span>
          {/* Touch affordance */}
          <motion.span
            className="text-xl leading-none text-muted md:hidden"
            initial={false}
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
            <div className="grid gap-6 pb-9 pl-[2.5rem] md:grid-cols-12 md:gap-10 md:pb-11 md:pl-[8rem]">
              <p className="t-body-sm max-w-[52ch] md:col-span-6 md:text-[1.0625rem]">
                {service.body}
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5 md:col-span-4 md:col-start-8 md:flex-col">
                {service.tags.map((t) => (
                  <li key={t} className="t-meta">
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

/**
 * The service list — six oversized typographic rows, no cards. A
 * cursor-tracked image preview follows the pointer on desktop only.
 */
export default function Services() {
  const desktop = useDesktop()
  const [active, setActive] = useState<number | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spx = useSpring(px, { stiffness: 140, damping: 22, mass: 0.5 })
  const spy = useSpring(py, { stiffness: 140, damping: 22, mass: 0.5 })

  const onPointerMove = (e: React.PointerEvent) => {
    if (!desktop || !listRef.current) return
    const r = listRef.current.getBoundingClientRect()
    px.set(e.clientX - r.left)
    py.set(e.clientY - r.top)
  }

  const showPreview = desktop && active !== null

  return (
    <section id="services" className="section relative" aria-label="Services">
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
            <span className="n">( 04 )</span>
            <span>Services</span>
          </motion.p>

          <div className="md:col-span-9">
            <RevealText
              as="h2"
              className="t-display"
              lines={[
                'WHAT WE',
                <>
                  <span className="em">Actually</span> DO.
                </>
              ]}
            />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="t-body mt-8 max-w-[44ch] md:mt-10"
            >
              Six disciplines, one team. Strategy through to shipped code — without the hand-offs
              where ideas usually die.
            </motion.p>
          </div>
        </div>

        {/* Rows */}
        <div ref={listRef} className="relative mt-16 md:mt-24" onPointerMove={onPointerMove}>
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="border-t border-line"
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
                className="frame pointer-events-none absolute left-0 top-0 z-[5] hidden aspect-[4/5] w-[11rem] lg:block xl:w-[13rem]"
                style={{ x: spx, y: spy, translateX: '7rem', translateY: '-50%' }}
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
                  className="size-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
