import { motion } from 'framer-motion'
import { clients } from '../data/content'
import { fadeUp, staggerFast, viewportOnce } from '../lib/motion'

/**
 * Clients as flowing typography (spec §12) — no logo cards, no grid of
 * grey rectangles. Names are placeholders pending approval.
 */
export default function Clients() {
  return (
    <section className="relative py-20 md:py-28" aria-label="Selected clients">
      <div className="shell">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--border)] pb-5"
        >
          <p className="eyebrow">Selected clients</p>
          <p className="t-meta !text-[0.625rem] !tracking-[0.16em] opacity-70">
            [ Placeholder roster ]
          </p>
        </motion.div>

        <motion.ul
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-2"
        >
          {clients.map((c) => (
            <motion.li
              key={c.name}
              variants={fadeUp}
              className="group flex items-baseline justify-between gap-6 border-b border-[var(--border)] py-4 transition-colors duration-500 hover:border-[var(--border-strong)] md:py-5"
            >
              <span className="display text-[clamp(1.375rem,4vw,2.5rem)] text-bone-dim transition-[color,transform] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-bone">
                {c.name}
              </span>
              <span className="t-meta shrink-0 transition-colors duration-500 group-hover:text-bone-dim">
                {c.sector}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
