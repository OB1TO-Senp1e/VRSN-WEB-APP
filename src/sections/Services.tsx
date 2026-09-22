import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { services } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce, EASE } from '../lib/motion'
import SectionHeading from '../components/SectionHeading'

/** Large typographic accordion — one open row at a time. */
function ServiceRow({
  service,
  open,
  onToggle
}: {
  service: (typeof services)[number]
  open: boolean
  onToggle: () => void
}) {
  const panelId = `service-panel-${service.index}`
  const btnId = `service-btn-${service.index}`

  return (
    <motion.li variants={fadeUp} className="border-b border-[rgba(242,239,233,0.1)]">
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center gap-6 py-7 text-left md:gap-10 md:py-9"
        >
          <span className={`font-mono text-xs transition-colors duration-500 md:text-sm ${open ? 'text-accent' : 'text-bone-faint'}`}>
            {service.index}
          </span>
          <span
            className={`display flex-1 text-[clamp(1.6rem,4.5vw,3.4rem)] transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
              open ? 'translate-x-2 text-bone md:translate-x-4' : 'text-bone-dim group-hover:translate-x-2 group-hover:text-bone'
            }`}
          >
            {service.title}
          </span>
          <motion.span
            className={`grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-500 md:size-12 ${
              open ? 'border-accent text-accent' : 'border-[rgba(242,239,233,0.18)] text-bone-faint group-hover:border-[rgba(242,239,233,0.4)] group-hover:text-bone'
            }`}
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            aria-hidden="true"
          >
            <Plus className="size-4" />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-9 pl-12 md:grid-cols-2 md:pl-24">
              <p className="max-w-lg text-base leading-relaxed text-bone-dim">{service.body}</p>
              <ul className="flex flex-wrap content-start gap-2" aria-label={`${service.title} capabilities`}>
                {service.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-[rgba(242,239,233,0.14)] px-3.5 py-1.5 text-xs tracking-wide text-bone-dim"
                  >
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
  const [openIndex, setOpenIndex] = useState<number>(1)

  return (
    <section id="services" className="relative bg-ink-2 px-6 py-28 md:px-10 md:py-40" aria-label="Services">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 md:mb-20">
          <SectionHeading number="02" label="What we do" title="Capabilities." />
        </div>
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="border-t border-[rgba(242,239,233,0.1)]"
        >
          {services.map((s, i) => (
            <ServiceRow
              key={s.index}
              service={s}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
