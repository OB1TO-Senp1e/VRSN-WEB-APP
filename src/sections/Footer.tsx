import { motion } from 'framer-motion'
import { mobileNavLinks, socials, studio } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

/** Minimal editorial footer (spec §15) — generous whitespace, all type. */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[var(--border)]" aria-label="Footer">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="shell py-16 md:py-20"
      >
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand */}
          <motion.div variants={fadeUp} className="md:col-span-5">
            <a href="#top" className="display block text-[2rem] leading-none text-bone">
              {studio.name}
              <span className="text-accent">{studio.mark}</span>
            </a>
            <p className="mt-5 max-w-[30ch] text-[0.9375rem] leading-relaxed text-bone-dim">
              {studio.positioning} for brand, web and motion. {studio.tagline}
            </p>
          </motion.div>

          {/* Menu */}
          <motion.nav variants={fadeUp} className="md:col-span-2" aria-label="Footer">
            <p className="t-meta mb-5">Menu</p>
            <ul className="space-y-2.5">
              {mobileNavLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="u-link text-[0.9375rem] text-bone-dim transition-colors duration-500 hover:text-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Social */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <p className="t-meta mb-5">Social</p>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link text-[0.9375rem] text-bone-dim transition-colors duration-500 hover:text-bone"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp} className="md:col-span-3">
            <p className="t-meta mb-5">Contact</p>
            <a
              href={`mailto:${studio.email}`}
              className="u-link text-[0.9375rem] text-bone-dim transition-colors duration-500 hover:text-bone"
            >
              {studio.email}
            </a>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-bone-dim">
              {studio.location}
              <br />
              {studio.timezone}
            </p>
          </motion.div>
        </div>

        {/* Bottom rule */}
        <motion.div
          variants={fadeUp}
          className="mt-16 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 border-t border-[var(--border)] pt-7 md:mt-20"
        >
          <p className="t-meta !tracking-[0.14em]">
            © {year} {studio.name} Studio
          </p>
          <p className="t-meta !tracking-[0.14em]">{studio.tagline}</p>
          <a href="#top" className="u-link t-meta !tracking-[0.14em] hover:text-bone-dim">
            Back to top ↑
          </a>
        </motion.div>
      </motion.div>
    </footer>
  )
}
