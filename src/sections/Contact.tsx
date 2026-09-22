import { motion } from 'framer-motion'
import { studio, socials } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import RevealText from '../components/RevealText'
import EditorialLink from '../components/EditorialLink'

/**
 * The close. Pure typography at the largest scale on the page — no
 * glow, no gradient, no boxed form. The CTA is the last thing the eye
 * lands on.
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
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="sec-label mb-10 md:mb-16"
        >
          <span className="n">( 08 )</span>
          <span>Contact</span>
        </motion.p>

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
          className="mt-16 grid gap-12 border-t border-line pt-10 md:mt-24 md:grid-cols-12 md:gap-10 md:pt-12"
        >
          {/* Primary CTA */}
          <motion.div variants={fadeUp} className="md:col-span-5">
            <p className="t-meta mb-6">New business</p>
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
            <p className="t-meta mb-6">Direct</p>
            <a
              href={`mailto:${studio.email}`}
              className="u-link display block text-[1.125rem] md:text-[1.375rem]"
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
            <p className="t-meta mb-6">Elsewhere</p>
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
