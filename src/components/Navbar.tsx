import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { navLinks } from '../data/content'
import { EASE } from '../lib/motion'
import Magnetic from './Magnetic'

/**
 * Premium navigation: transparent at top, condenses into a floating
 * glass bar on scroll. Full-screen staggered overlay on mobile.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  // Lock body scroll while the overlay menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.6 }}
        className="fixed inset-x-0 top-0 z-[70]"
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? 'mt-3 max-w-[calc(100%-1.5rem)] rounded-2xl border border-[rgba(242,239,233,0.08)] bg-[rgba(10,10,11,0.72)] px-5 py-3 backdrop-blur-xl md:max-w-4xl md:px-6'
              : 'mt-0 max-w-none border border-transparent bg-transparent px-6 py-5 md:px-10 md:py-7'
          }`}
        >
          <a href="#top" className="display text-lg tracking-tight text-bone" aria-label="VRSN — back to top">
            VRSN<span className="text-accent">®</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="u-link text-[13px] font-medium tracking-wide text-bone-dim hover:text-bone transition-colors duration-300">
                {l.label}
              </a>
            ))}
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                className="rounded-full bg-bone px-5 py-2 text-[13px] font-semibold text-ink transition-colors duration-500 hover:bg-accent"
              >
                Start a project
              </a>
            </Magnetic>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="relative z-[75] flex size-10 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <motion.span
              className="block h-[1.5px] w-6 bg-bone"
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            />
            <motion.span
              className="block h-[1.5px] w-6 bg-bone"
              animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[72] flex flex-col justify-between bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-2xl md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Mobile">
              <ul className="space-y-2">
                {navLinks.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.a
                      href={l.href}
                      className="display block py-2 text-5xl text-bone"
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%', transition: { duration: 0.3 } }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.07 }}
                      onClick={() => setOpen(false)}
                    >
                      <span className="mr-4 align-super text-xs text-accent">0{i + 1}</span>
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
              className="space-y-4"
            >
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full bg-bone py-4 text-center text-sm font-semibold text-ink"
              >
                Start a project
              </a>
              <p className="text-center text-xs tracking-[0.25em] text-bone-faint">HELLO@VRSN.STUDIO</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
