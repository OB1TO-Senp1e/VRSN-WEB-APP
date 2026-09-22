import { motion } from 'framer-motion'
import { studio, socials } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import RevealText from '../components/RevealText'
import EditorialLink from '../components/EditorialLink'

/**
 * The close.
 *
 * Pure typography at the largest scale on the page — no glow, no gradient,
 * no boxed form. The headline is set as three lines with the last word in
 * serif italic and the accent, so the eye lands on the *idea* before it
 * lands on the action.
 *
 * The three detail columns below are the studio's actual contact surface:
 * new business, a direct address, and where else it publishes.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      data-theme="ink"
      className="chapter-ink section relative"
      aria-label="Start a project"
    >
      <div className="shell">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 flex items-baseline justify-between gap-6 border-b border-line pb-5 md:mb-16"
        >
          <p className="sec-label">
            <span className="n">( 10 )</span>
            <span>Contact</span>
          </p>
          <p className="t-meta hidden sm:block">{studio.email}</p>
        </motion.div>

        <RevealText
          as="h2"
          className="t-hero"
          lines={[
            "LET'S MAKE",
            'SOMETHING',
            <>
              <span className="em text-accent">Memorable</span>.
            </>
          ]}
        />

        {/* CTA + details */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-12 border-t border-line pt-10 md:mt-20 md:grid-cols-12 md:gap-10 md:pt-12"
        >
          {/* Primary CTA */}
          <motion.div variants={fadeUp} className="md:col-span-5">
            <p className="t-meta mb-7">New business</p>
            <EditorialLink
              href={`mailto:${studio.email}`}
              size="lg"
              magnetic
              cursor="talk"
              className="text-[1rem] md:text-[1.25rem]"
            >
              Let's talk
            </EditorialLink>
            <p className="t-body-sm mt-8 max-w-[36ch]">
              Tell us what you are building, who it is for, and when it needs to exist. We reply
              within two working days.
            </p>
          </motion.div>

          {/* Direct */}
          <motion.div variants={fadeUp} className="md:col-span-3 md:col-start-7">
            <p className="t-meta mb-7">Direct</p>
            <a
              href={`mailto:${studio.email}`}
              className="u-link display block text-[1.0625rem] normal-case tracking-[-0.02em] md:text-[1.375rem]"
            >
              {studio.email}
            </a>
            <p className="t-body-sm mt-5">
              {studio.location}
              <br />
              {studio.timezone}
            </p>
          </motion.div>

          {/* Elsewhere */}
          <motion.div variants={fadeUp} className="md:col-span-3 md:col-start-10">
            <p className="t-meta mb-7">Elsewhere</p>
            <ul className="space-y-2.5">
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
        </motion.div>
      </div>
    </section>
  )
}
