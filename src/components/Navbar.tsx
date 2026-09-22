import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { navLinks, studio } from '../data/content'
import { EASE } from '../lib/motion'
import MobileMenu from './MobileMenu'

/**
 * Studio navigation. Transparent and set in the page margin at rest;
 * on scroll it tightens, picks up a faint blurred ground and a hairline.
 */
export default function Navbar({ ready = true }: { ready?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > 40
    if (next !== scrolled) setScrolled(next)
  })

  const solid = scrolled && !open

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-[74]"
      >
        {/* Ground */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 border-b border-[var(--border)] bg-[rgba(10,10,10,0.72)] backdrop-blur-md"
          animate={{ opacity: solid ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        />

        <motion.div
          className="shell relative grid grid-cols-2 items-center lg:grid-cols-12"
          animate={{ height: solid ? '3.5rem' : '4.75rem' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Wordmark */}
          <a
            href="#top"
            className="display inline-flex items-baseline text-[1.0625rem] leading-none text-bone lg:col-span-3"
            aria-label={`${studio.name} — back to top`}
          >
            {studio.name}
            <span className="text-accent">{studio.mark}</span>
          </a>

          {/* Studio line — desktop only, fades on scroll */}
          <motion.p
            className="t-meta hidden lg:col-span-4 lg:block"
            animate={{ opacity: solid ? 0 : 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            aria-hidden={solid}
          >
            {studio.positioning} — {studio.disciplines}
          </motion.p>

          {/* Desktop navigation */}
          <nav
            className="hidden items-center justify-end gap-9 lg:col-span-5 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="u-link t-meta !text-bone-dim transition-colors duration-500 hover:!text-bone"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              data-cursor="talk"
              className="e-link !pb-[0.3rem] !text-[0.6875rem] md:!text-[0.75rem]"
            >
              <span>Let's Talk</span>
              <span className="e-link__arrow" aria-hidden="true">→</span>
            </a>
          </nav>

          {/* Mobile / tablet trigger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="t-meta relative z-[76] -mr-2 flex items-center justify-end gap-3 py-2 pl-3 pr-2 !text-bone lg:hidden"
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
              <motion.span
                className="block h-px w-full origin-center bg-bone"
                animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              />
              <motion.span
                className="block h-px w-full origin-center bg-bone"
                animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
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
