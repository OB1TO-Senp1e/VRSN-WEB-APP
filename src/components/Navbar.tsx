import { useCallback, useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { navLinks, studio } from '../data/content'
import { EASE } from '../lib/motion'
import MobileMenu from './MobileMenu'

/** Vertical probe (px from top) used to decide which chapter is under the nav. */
const PROBE_Y = 28

/**
 * Studio navigation. Transparent and set in the page margin at rest;
 * on scroll it tightens, picks up a blurred ground and a hairline.
 * It reads the chapter beneath (`[data-theme="ink"]`) and flips its own
 * ink/paper palette so it stays legible across the whole page.
 */
export default function Navbar({ ready = true }: { ready?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [overInk, setOverInk] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  const probe = useCallback(() => {
    const chapters = document.querySelectorAll<HTMLElement>('[data-theme="ink"]')
    let hit = false
    chapters.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top <= PROBE_Y && r.bottom >= PROBE_Y) hit = true
    })
    setOverInk(hit)
  }, [])

  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > 48
    if (next !== scrolled) setScrolled(next)
    probe()
  })

  useEffect(() => {
    probe()
    window.addEventListener('resize', probe)
    return () => window.removeEventListener('resize', probe)
  }, [probe])

  const solid = scrolled && !open
  const dark = overInk || open

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        className={`fixed inset-x-0 top-0 z-[74] transition-colors duration-700 ${
          dark ? 'text-paper' : 'text-ink'
        }`}
      >
        {/* Ground — blurred, hairline. Palette follows the chapter beneath. */}
        <motion.div
          aria-hidden="true"
          className={`absolute inset-0 border-b backdrop-blur-md transition-colors duration-700 ${
            dark
              ? 'border-[rgba(244,241,235,0.12)] bg-[rgba(14,14,13,0.72)]'
              : 'border-[rgba(14,14,13,0.10)] bg-[rgba(244,241,235,0.78)]'
          }`}
          animate={{ opacity: solid ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        />

        <motion.div
          className="shell relative flex items-center justify-between"
          animate={{ height: solid ? '3.5rem' : '4.75rem' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Wordmark */}
          <a
            href="#top"
            className="display inline-flex items-baseline text-[1.125rem] leading-none tracking-[-0.03em]"
            aria-label={`${studio.name} — back to top`}
          >
            {studio.name}
            <span className="ml-[0.05em] text-[0.55em] font-medium">{studio.mark}</span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="u-link t-meta text-current opacity-70 transition-opacity duration-500 hover:opacity-100"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              data-cursor="talk"
              className="e-link pb-[0.3rem] text-current text-[0.6875rem] md:text-[0.75rem]"
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
            className="t-meta relative z-[76] -mr-2 flex items-center justify-end gap-3 py-2 pl-3 pr-2 text-current lg:hidden"
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
              <motion.span
                className="block h-px w-full origin-center bg-current"
                animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              />
              <motion.span
                className="block h-px w-full origin-center bg-current"
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
