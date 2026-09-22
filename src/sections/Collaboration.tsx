import { motion } from 'framer-motion'
import { audiences, collaboration } from '../data/content'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import RevealText from '../components/RevealText'

/**
 * Who the studio works with.
 *
 * Typography only — four audience entries set as oversized editorial
 * lines, each with its description standing in a narrow right-hand
 * column on the same baseline. No cards, no icons, no logos.
 *
 * The rows are the same object repeated four times, so the section reads
 * as a register rather than a feature grid. On narrow screens the
 * description follows the title rather than sitting beside it.
 */
export default function Collaboration() {
  return (
    <section className="section relative border-t border-line" aria-label="Who we work with">
      <div className="shell">
        {/* Header + statement */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="sec-label md:col-span-3 md:self-start"
          >
            <span className="n">( 08 )</span>
            <span>{collaboration.label}</span>
          </motion.p>

          <div className="md:col-span-9">
            <RevealText
              as="h2"
              className="t-display"
              lines={[
                collaboration.headline[0],
                collaboration.headline[1],
                <>
                  MAKE <span className="em text-accent">Things</span>.
                </>
              ]}
            />
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="t-body md:col-span-4 md:col-start-9 md:pt-3"
          >
            {collaboration.intro}
          </motion.p>
        </div>

        {/* Audience register */}
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 border-t border-line md:mt-24"
        >
          {audiences.map((a) => (
            <motion.div
              key={a.index}
              variants={fadeUp}
              className="group grid grid-cols-1 gap-y-3 border-b border-line py-7 transition-colors duration-700 hover:border-line-strong md:grid-cols-12 md:items-baseline md:gap-x-10 md:py-9"
            >
              <div className="flex items-baseline gap-5 md:col-span-7 md:gap-8">
                <span className="t-index shrink-0 transition-colors duration-500 group-hover:text-accent">
                  {a.index}
                </span>
                <dt className="t-row transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  {a.title}
                </dt>
              </div>

              <dd className="t-body-sm ml-[2.5rem] max-w-[42ch] md:col-span-4 md:col-start-9 md:ml-0">
                {a.body}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
