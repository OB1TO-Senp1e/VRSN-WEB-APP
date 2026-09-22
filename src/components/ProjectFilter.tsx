import { motion } from 'framer-motion'
import { filters } from '../data/content'
import { EASE, fadeUp, viewportOnce } from '../lib/motion'

interface ProjectFilterProps {
  active: string
  onChange: (key: string) => void
  counts: Record<string, number>
}

/**
 * Editorial filters — a typographic row with one sliding indicator
 * rule. No pills, no boxes, no active-state fills. Scrolls
 * horizontally on narrow screens.
 */
export default function ProjectFilter({ active, onChange, counts }: ProjectFilterProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div
        role="tablist"
        aria-label="Filter work by discipline"
        className="flex min-w-max items-baseline gap-7 border-b border-line pb-4 md:gap-11"
      >
        {filters.map((f) => {
          const isActive = active === f.key
          const count = counts[f.key] ?? 0
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="work-grid"
              disabled={count === 0}
              onClick={() => onChange(f.key)}
              className="group relative flex items-baseline gap-1.5 pb-1 text-left disabled:opacity-30"
            >
              <span
                className={`t-meta transition-colors duration-500 ${
                  isActive ? 'text-fg' : 'group-hover:text-fg'
                }`}
              >
                {f.label}
              </span>
              <span
                className={`t-index text-[0.5625rem] transition-colors duration-500 ${
                  isActive ? 'text-accent' : ''
                }`}
                aria-hidden="true"
              >
                {String(count).padStart(2, '0')}
              </span>

              {isActive && (
                <motion.span
                  layoutId="filter-indicator"
                  className="absolute -bottom-[1.05rem] left-0 right-0 h-px bg-fg"
                  transition={{ duration: 0.6, ease: EASE }}
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
