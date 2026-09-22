import { motion } from 'framer-motion'
import { about, principles, studio } from '../data/content'
import { fadeUp, ruleReveal, staggerContainer, viewportOnce } from '../lib/motion'
import RevealText from '../components/RevealText'
import ImageReveal from '../components/ImageReveal'
import EditorialLink from '../components/EditorialLink'

/**
 * The studio chapter. An oversized claim, the actual argument set small
 * and narrow beside it, then a photograph, the three working
 * principles and a factual record — no invented statistics, no awards,
 * no client logos.
 */
export default function About() {
  return (
    <section id="about" className="section relative" aria-label="About the studio">
      <div className="shell">
        {/* Header */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="sec-label mb-8 md:mb-12"
        >
          <span className="n">( 05 )</span>
          <span>Studio</span>
        </motion.p>

        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Headline */}
          <div className="md:col-span-7">
            <RevealText
              as="h2"
              className="t-display"
              lines={[
                about.headline[0],
                about.headline[1],
                <>
                  {about.headline[2].slice(0, about.headline[2].length - about.em.length - 1)}
                  <span className="em text-accent">{about.em}</span>.
                </>
              ]}
            />
          </div>

          {/* Argument */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="md:col-span-4 md:col-start-9 md:pt-3"
          >
            {about.body.map((p, i) => (
              <motion.p
                key={p}
                variants={fadeUp}
                className={`max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted md:text-[1.1875rem] ${
                  i > 0 ? 'mt-6' : ''
                }`}
              >
                {p}
              </motion.p>
            ))}
            <motion.div variants={fadeUp} className="mt-9">
              <EditorialLink href="#contact" size="md" cursor="talk">
                Work with us
              </EditorialLink>
            </motion.div>
          </motion.div>
        </div>

        {/* Record — facts, stated plainly */}
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 md:mt-28 md:grid-cols-4 md:pt-12"
        >
          {about.facts.map((f) => (
            <motion.div key={f.label} variants={fadeUp}>
              <dt className="t-meta">{f.label}</dt>
              <dd className="display mt-3 text-[1.25rem] md:text-[1.5rem]">{f.value}</dd>
            </motion.div>
          ))}
        </motion.dl>

        {/* Image + principles */}
        <div className="mt-20 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <ImageReveal
              src="/images/about-studio.jpg"
              alt="Monochrome geometric architecture — the visual language of the VRSN studio"
              aspect="aspect-[4/3] md:aspect-[4/5]"
              parallax={7}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <p className="t-meta mt-4 flex justify-between">
              <span>Studio</span>
              <span>{studio.location}</span>
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="md:col-span-6 md:col-start-7 md:pt-4"
          >
            <motion.p variants={fadeUp} className="t-meta mb-8">
              How we hold ourselves
            </motion.p>

            <ol className="border-t border-line">
              {principles.map((p) => (
                <motion.li
                  key={p.index}
                  variants={fadeUp}
                  className="group grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-line py-7 md:grid-cols-[3.5rem_1fr] md:gap-x-6 md:py-8"
                >
                  <span className="t-index pt-1 transition-colors duration-500 group-hover:text-accent">
                    {p.index}
                  </span>
                  <div>
                    <h3 className="display text-[1.375rem] md:text-[1.625rem]">{p.title}</h3>
                    <p className="t-body-sm mt-2 max-w-[52ch]">{p.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <motion.div variants={fadeUp} className="mt-8">
              <EditorialLink href="#process" size="md">
                How we work
              </EditorialLink>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          aria-hidden="true"
          className="mt-20 h-px origin-left bg-line md:mt-28"
          variants={ruleReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        />
      </div>
    </section>
  )
}
