import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mobileNavLinks, socials, studio } from '../data/content'
import { EASE } from '../lib/motion'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

/**
 * Full-screen navigation overlay (spec §01). Staggered masked
 * typography, numbered items, and a focus trap while open.
 */
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  /* Lock scroll + trap focus while open */
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const first = panelRef.current?.querySelector<HTMLElement>('a, button')
    first?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      ).filter((el) => el.offsetParent !== null)
      if (items.length === 0) return
      const head = items[0]
      const tail = items[items.length - 1]
      if (e.shiftKey && document.activeElement === head) {
        e.preventDefault()
        tail.focus()
      } else if (!e.shiftKey && document.activeElement === tail) {
        e.preventDefault()
        head.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[72] flex flex-col justify-between bg-ink shell pb-10 pt-28 lg:hidden"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.6, ease: EASE } }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <nav aria-label="Primary">
            <ul>
              {mobileNavLinks.map((l, i) => (
                <li key={l.href} className="border-b border-[var(--border)]">
                  <div className="overflow-hidden">
                    <motion.a
                      href={l.href}
                      onClick={onClose}
                      className="flex items-baseline gap-5 py-4 will-change-transform"
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%', transition: { duration: 0.35, ease: EASE } }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.16 + i * 0.075 }}
                    >
                      <span className="t-index text-accent">0{i + 1}</span>
                      <span className="display text-[clamp(2.75rem,15vw,4.5rem)] text-bone">
                        {l.label}
                      </span>
                    </motion.a>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
            className="space-y-7"
          >
            <div>
              <p className="eyebrow mb-2">Start a project</p>
              <a
                href={`mailto:${studio.email}`}
                onClick={onClose}
                className="u-link display text-[clamp(1.25rem,6vw,1.75rem)] text-bone"
              >
                {studio.email}
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link t-meta text-bone-dim"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
