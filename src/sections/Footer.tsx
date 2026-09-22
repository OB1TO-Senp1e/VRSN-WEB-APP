import { motion } from 'framer-motion'
import { mobileNavLinks, socials, studio } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

/**
 * Minimal editorial footer — generous whitespace, all type, one rule.
 *
 * Deliberately the quietest block on the page: after the scale of the
 * closing statement, the footer's job is to get out of the way and only
 * offer the exits.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      data-theme="ink"
      className="chapter-ink relative border-t border-line"
      aria-label="Footer"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="shell py-14 md:py-20"
      >
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand */}
          <motion.div variants={fadeUp} className="md:col-span-5">
            <a
              href="#top"
              className="display group inline-flex items-baseline text-[2rem] uppercase leading-none"
              aria-label={`${studio.name} — back to top`}
            >
              {studio.name}
              <span className="ml-[0.06em] text-[0.5em] font-medium text-accent transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[0.3em]">
                {studio.mark}
              </span>
            </a>
            <p className="t-body-sm mt-6 max-w-[34ch]">
              {studio.positioning} for brand, web and motion. {studio.tagline}
            </p>
          </motion.div>

          {/* Menu */}
          <motion.nav variants={fadeUp} className="md:col-span-2" aria-label="Footer">
            <p className="t-meta mb-5">Menu</p>
            <ul className="space-y-3">
              {mobileNavLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="u-link text-[0.9375rem] text-muted transition-colors duration-500 hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Social */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <p className="t-meta mb-5">Elsewhere</p>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link text-[0.9375rem] text-muted transition-colors duration-500 hover:text-fg"
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
              className="u-link text-[0.9375rem] text-muted transition-colors duration-500 hover:text-fg"
            >
              {studio.email}
            </a>
            <p className="t-body-sm mt-4">
              {studio.location}
              <br />
              {studio.timezone}
            </p>
          </motion.div>
        </div>

        {/* Bottom rule */}
        <motion.div
          variants={fadeUp}
          className="mt-16 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 border-t border-line pt-6 md:mt-20"
        >
          <p className="t-meta">
            © {year} {studio.name} Studio
          </p>
          <p className="t-meta hidden sm:block">
            {studio.disciplines} · Est. {studio.founded}
          </p>
          <a
            href="#top"
            className="u-link t-meta transition-colors duration-500 hover:text-fg"
            data-cursor="arrow"
          >
            Back to top ↑
          </a>
        </motion.div>
      </motion.div>
    </footer>
  )
}
