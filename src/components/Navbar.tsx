import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { navLinks, studio } from '../data/content'
import { EASE } from '../lib/motion'
import MobileMenu from './MobileMenu'

/**
 * Studio navigation (spec §01). Sits in the page margin rather than in a
 * chrome bar: no border, no pill, no floating card. On scroll it tightens
 * and picks up a faint blurred ground so type stays legible over imagery.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > 48
    if (next !== scrolled) setScrolled(next)
  })

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        className="fixed inset-x-0 top-0 z-[74]"
      >
        {/* Ground: fades in on scroll only */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 backdrop-blur-lg"
          animate={{ opacity: scrolled && !open ? 1 : 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            background:
              'linear-gradient(to bottom, rgba(11,11,12,0.88) 0%, rgba(11,11,12,0.62) 62%, rgba(11,11,12,0) 100%)'
          }}
        />

        <motion.div
          className="shell relative flex items-center justify-between"
          animate={{
            paddingTop: scrolled ? '0.95rem' : '1.75rem',
            paddingBottom: scrolled ? '0.95rem' : '1.75rem'
          }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* Wordmark */}
          <a
            href="#top"
            className="display shrink-0 leading-none text-bone"
            aria-label={`${studio.name} — back to top`}
          >
            <motion.span
              className="inline-block"
              animate={{ fontSize: scrolled ? '1.0625rem' : '1.1875rem' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {studio.name}
              <span className="text-accent">{studio.mark}</span>
            </motion.span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="u-link text-[0.8125rem] font-medium tracking-[0.02em] text-bone-dim transition-colors duration-500 hover:text-bone"
              >
                {l.label}
              </a>
            ))}
            <span className="h-3 w-px bg-[var(--border-strong)]" aria-hidden="true" />
            <a
              href="#contact"
              data-cursor="talk"
              className="u-link text-[0.8125rem] font-semibold tracking-[0.02em] text-bone"
            >
              Let's Talk
            </a>
          </nav>

          {/* Mobile / tablet trigger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-[76] -mr-1 flex items-center gap-2.5 py-1 pl-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-bone lg:hidden"
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
              <motion.span
                className="block h-[1.5px] w-full origin-center bg-bone"
                animate={open ? { rotate: 45, y: 3.25 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              />
              <motion.span
                className="block h-[1.5px] w-full origin-center bg-bone"
                animate={open ? { rotate: -45, y: -3.25 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              />
            </span>
          </button>
        </motion.div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
