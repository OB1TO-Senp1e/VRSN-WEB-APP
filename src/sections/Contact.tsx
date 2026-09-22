import { motion } from 'framer-motion'
import { studio, socials } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import RevealText from '../components/RevealText'
import EditorialLink from '../components/EditorialLink'

/**
 * The close (spec §14). Pure typography at the largest scale on the
 * page — no glow, no gradient, no boxed form. The CTA is the last
 * thing the eye lands on.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative pb-24 pt-24 md:pb-32 md:pt-32 lg:pb-40 lg:pt-44"
      aria-label="Start a project"
    >
      <div className="shell">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="eyebrow mb-10 md:mb-14"
        >
          <span className="text-accent">05</span>
          <span className="px-3 text-[var(--muted-2)]">/</span>
          Contact
        </motion.p>

        <RevealText
          as="h2"
          className="t-hero text-bone"
          lines={[
            "LET'S MAKE",
            'SOMETHING',
            <>
              <span className="t-em pr-[0.06em] text-accent">Memorable</span>.
            </>
          ]}
        />

        {/* CTA + details */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-12 border-t border-[var(--border)] pt-10 md:mt-20 md:grid-cols-12 md:gap-10 md:pt-12"
        >
          {/* Primary CTA */}
          <motion.div variants={fadeUp} className="md:col-span-5">
            <p className="t-meta mb-5">New business</p>
            <EditorialLink
              href={`mailto:${studio.email}`}
              size="lg"
              magnetic
              cursor="talk"
              className="!text-[0.9375rem] md:!text-[1.0625rem]"
            >
              Start a project
            </EditorialLink>
            <p className="mt-7 max-w-[34ch] text-[0.9375rem] leading-relaxed text-bone-dim">
              Tell us what you are building, who it is for, and when it needs to
              exist. We reply within two working days.
            </p>
          </motion.div>

          {/* Direct */}
          <motion.div variants={fadeUp} className="md:col-span-3 md:col-start-7">
            <p className="t-meta mb-5">Direct</p>
            <a
              href={`mailto:${studio.email}`}
              className="u-link display block text-[clamp(1.125rem,2.6vw,1.5rem)] text-bone"
            >
              {studio.email}
            </a>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-bone-dim">
              {studio.location}
              <br />
              {studio.timezone}
            </p>
          </motion.div>

          {/* Elsewhere */}
          <motion.div variants={fadeUp} className="md:col-span-3 md:col-start-10">
            <p className="t-meta mb-5">Elsewhere</p>
            <ul className="space-y-2">
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
        </motion.div>
      </div>
    </section>
  )
}
