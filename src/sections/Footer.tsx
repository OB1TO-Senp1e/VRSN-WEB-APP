import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { navLinks } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import Magnetic from '../components/Magnetic'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'X / Twitter', href: 'https://x.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' }
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[rgba(242,239,233,0.08)] bg-ink-2 px-6 pb-10 pt-20 md:px-10" aria-label="Footer">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto max-w-7xl"
      >
        <div className="grid gap-14 md:grid-cols-12">
          {/* Brand */}
          <motion.div variants={fadeUp} className="md:col-span-5">
            <p className="display text-4xl text-bone">
              VRSN<span className="text-accent">®</span>
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone-faint">
              Independent creative studio for brand, web and motion. Every idea has a version.
            </p>
          </motion.div>

          {/* Menu */}
          <motion.nav variants={fadeUp} className="md:col-span-2" aria-label="Footer navigation">
            <p className="eyebrow mb-5">Menu</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="u-link text-sm text-bone-dim transition-colors hover:text-bone">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Socials */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <p className="eyebrow mb-5">Socials</p>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link text-sm text-bone-dim transition-colors hover:text-bone"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp} className="md:col-span-3">
            <p className="eyebrow mb-5">Contact</p>
            <a href="mailto:hello@vrsn.studio" className="u-link text-sm text-bone-dim transition-colors hover:text-bone">
              hello@vrsn.studio
            </a>
            <p className="mt-4 text-sm leading-relaxed text-bone-faint">
              Working worldwide
              <br />
              GMT+0 — GMT+8
            </p>
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          variants={fadeUp}
          className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[rgba(242,239,233,0.08)] pt-8"
        >
          <p className="text-xs text-bone-faint">© {year} VRSN Studio. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-bone-faint">
            <a href="#top" className="u-link transition-colors hover:text-bone">Privacy</a>
            <a href="#top" className="u-link transition-colors hover:text-bone">Terms</a>
            <Magnetic strength={0.3}>
              <a
                href="#top"
                aria-label="Back to top"
                className="grid size-11 place-items-center rounded-full border border-[rgba(242,239,233,0.18)] text-bone-dim transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <ArrowUp className="size-4" aria-hidden="true" />
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
