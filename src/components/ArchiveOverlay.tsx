import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, archive } from '../data/content'
import { EASE } from '../lib/motion'

interface ArchiveOverlayProps {
  open: boolean
  onClose: () => void
}

/**
 * Full-screen index of every project — an editorial contents page,
 * not a modal card.
 */
export default function ArchiveOverlay({ open, onClose }: ArchiveOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('button')?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const entries = [
    ...projects.map((p) => ({
      title: p.title,
      category: p.discipline,
      year: p.year
    })),
    ...archive
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Complete project index"
          className="fixed inset-0 z-[96] overflow-y-auto bg-ink"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.6, ease: EASE } }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="shell py-20 md:py-24">
            <div className="flex items-end justify-between gap-8 border-b border-[var(--border)] pb-8">
              <div>
                <p className="eyebrow mb-4">Complete index</p>
                <h2 className="display text-[clamp(2.25rem,7vw,4.5rem)] text-bone">
                  Archive
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="e-link shrink-0 text-[0.6875rem] tracking-[0.2em]"
              >
                <span>Close</span>
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <ul className="mt-2">
              {entries.map((e, i) => (
                <motion.li
                  key={`${e.title}-${e.year}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: EASE, delay: 0.14 + i * 0.035 }}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 border-b border-[var(--border)] py-5 transition-colors duration-500 hover:border-[var(--border-strong)] md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,14rem)_4rem] md:gap-x-8"
                >
                  <span className="t-index text-bone-faint transition-colors duration-500 group-hover:text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="display text-[1.375rem] text-bone transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 md:text-[1.75rem]">
                    {e.title}
                  </span>
                  <span className="t-meta col-start-2 md:col-start-3 md:text-right">
                    {e.category}
                  </span>
                  <span className="t-meta tabular-nums md:text-right">{e.year}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
