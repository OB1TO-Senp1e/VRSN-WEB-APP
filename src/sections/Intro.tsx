import { motion } from 'framer-motion'
import { fadeUp, ruleReveal, staggerContainer, viewportOnce } from '../lib/motion'
import { principles, studio } from '../data/content'
import RevealText from '../components/RevealText'
import EditorialLink from '../components/EditorialLink'

/**
 * Positioning statement (spec §04). Two-column editorial: an oversized
 * claim on the left, the explanation set small and narrow on the right.
 * No cards, nothing centred.
 */
export default function Intro() {
  return (
    <section
      className="shell relative py-24 md:py-36 lg:py-44"
      aria-label="What the studio does"
    >
      <motion.div
        aria-hidden="true"
        className="mb-16 h-px origin-left bg-[var(--border)] md:mb-24"
        variants={ruleReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      />

      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        {/* Left — the claim */}
        <div className="md:col-span-7">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="eyebrow mb-8 md:mb-11"
          >
            <span className="text-accent">01</span>
            <span className="px-3 text-[var(--muted-2)]">/</span>
            Positioning
          </motion.p>

          <RevealText
            as="h2"
            className="t-display text-bone"
            lines={[
              'WE TURN',
              'IDEAS INTO',
              <>
                <span className="t-em pr-[0.06em] text-accent">Identities</span>.
              </>
            ]}
          />
        </div>

        {/* Right — the explanation, set small and deliberately narrow */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="md:col-span-4 md:col-start-9 md:pt-3"
        >
          <motion.p variants={fadeUp} className="t-body">
            {studio.name} is an independent practice for companies that would
            rather be recognised than described. We work in three moves —
            find the idea, give it a form, then build it properly.
          </motion.p>

          <motion.p variants={fadeUp} className="t-body mt-6">
            Founded in {studio.founded}. Small team by design, led by the
            people who actually make the work.
          </motion.p>

          {/* Principles — typographic list, not cards */}
          <motion.dl variants={fadeUp} className="mt-11 border-t border-[var(--border)]">
            {principles.map((p) => (
              <div
                key={p.index}
                className="flex gap-5 border-b border-[var(--border)] py-4"
              >
                <dt className="t-index shrink-0 pt-[0.2rem] text-accent">{p.index}</dt>
                <dd>
                  <p className="text-[0.9375rem] font-medium leading-snug text-bone">
                    {p.title}
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-bone-dim">
                    {p.body}
                  </p>
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={fadeUp} className="mt-9">
            <EditorialLink href="#about" size="md">
              About the studio
            </EditorialLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
