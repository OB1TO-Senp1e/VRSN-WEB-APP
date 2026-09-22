import { useCallback, useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { navLinks, studio } from '../data/content'
import { EASE } from '../lib/motion'
import { useScrolled, useScrollSpy } from '../hooks/useScrollSpy'
import { useDesktop } from '../hooks/useMedia'
import MobileMenu from './MobileMenu'

/** Vertical probe (px from top) used to decide which chapter is under the nav. */
const PROBE_Y = 28

const SECTION_IDS = navLinks.map((l) => l.section)

/**
 * Studio navigation.
 *
 * At rest it is transparent and sits in the page margin — no bar, no
 * border, just type. On scroll it quietly tightens and picks up a
 * hairline. It reads the chapter beneath it (`[data-theme="ink"]`) and
 * flips its own ink/paper palette so it stays legible across the whole
 * page, and it marks the section you are actually reading.
 */
export default function Navbar({ ready = true }: { ready?: boolean }) {
  const [overInk, setOverInk] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const scrolled = useScrolled(48)
  const desktop = useDesktop()
  const activeSection = useScrollSpy(SECTION_IDS, desktop && !open)

  const probe = useCallback(() => {
    const chapters = document.querySelectorAll<HTMLElement>('[data-theme="ink"]')
    let hit = false
    chapters.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top <= PROBE_Y && r.bottom >= PROBE_Y) hit = true
    })
    setOverInk(hit)
  }, [])

  useMotionValueEvent(scrollY, 'change', probe)

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
          initial={false}
          animate={{ opacity: solid ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        />

        <motion.div
          className="shell relative flex items-center justify-between"
          initial={false}
          animate={{ height: solid ? 'var(--nav-h-solid)' : 'var(--nav-h)' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Wordmark */}
          <a
            href="#top"
            className="display group relative inline-flex items-baseline text-[1.125rem] leading-none tracking-[-0.03em] md:text-[1.25rem]"
            aria-label={`${studio.name} — back to top`}
          >
            {studio.name}
            <span className="ml-[0.06em] text-[0.5em] font-medium text-accent transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[0.25em]">
              {studio.mark}
            </span>
          </a>

          {/* Desktop navigation — set as a type row, not a bar of chrome */}
          <nav className="hidden items-center gap-9 lg:flex xl:gap-11" aria-label="Primary">
            {navLinks.map((l) => {
              const isActive = activeSection === l.section
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className="group relative flex flex-col items-start gap-[0.4rem] py-1"
                >
                  <span
                    className={`t-meta transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                    }`}
                  >
                    {l.label}
                  </span>
                  {/* Active marker — a rule that grows, never a pill */}
                  <span
                    aria-hidden="true"
                    className="block h-px w-full origin-left bg-current transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transform: `scaleX(${isActive ? 1 : 0})` }}
                  />
                </a>
              )
            })}

            <a
              href="#contact"
              data-cursor="talk"
              className="e-link pb-[0.3rem] text-current text-[0.6875rem] md:text-[0.75rem]"
            >
              <span>Let's Talk</span>
              <span className="e-link__arrow" aria-hidden="true">
                →
              </span>
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
