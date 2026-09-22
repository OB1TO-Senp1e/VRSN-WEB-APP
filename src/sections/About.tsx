import { motion } from 'framer-motion'
import { about, principles, studio } from '../data/content'
import { fadeUp, ruleReveal, staggerContainer, viewportOnce } from '../lib/motion'
import RevealText from '../components/RevealText'
import ImageReveal from '../components/ImageReveal'
import EditorialLink from '../components/EditorialLink'

/**
 * The studio chapter.
 *
 * Composed as a printed spread rather than a stack of blocks: an
 * oversized claim holds the left seven columns while the actual argument
 * sits small and narrow in the right margin, deliberately unequal. The
 * photograph then runs wide beneath it with the factual record set on a
 * four-column baseline, and the three working principles close the
 * section as a numbered list.
 *
 * Every fact here is supportable — practice, team shape, disciplines,
 * location. There are no invented statistics, awards or client logos.
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
          className="sec-label mb-10 border-b border-line pb-5 md:mb-16"
        >
          <span className="n">( 06 )</span>
          <span>Studio</span>
        </motion.p>

        {/* Claim + argument */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
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

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="md:col-span-4 md:col-start-9 md:pt-2"
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

        {/* Photograph — wide, with the record on its baseline */}
        <div className="mt-16 md:mt-24">
          <ImageReveal
            src={about.image.src}
            alt={about.image.alt}
            aspect="aspect-[4/3] md:aspect-[16/7]"
            parallax={5}
            sizes="100vw"
            className="w-full"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="t-meta mt-4 flex items-baseline justify-between gap-6"
          >
            <span>The studio, in one image</span>
            <span>
              {studio.location} · {studio.timezone}
            </span>
          </motion.p>
        </div>

        {/* Record — facts, stated plainly */}
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-2 gap-x-8 gap-y-9 border-t border-line pt-9 md:mt-20 md:grid-cols-4 md:pt-11"
        >
          {about.facts.map((f) => (
            <motion.div key={f.label} variants={fadeUp}>
              <dt className="t-meta">{f.label}</dt>
              <dd className="display mt-2.5 text-[1.1875rem] md:text-[1.5rem]">{f.value}</dd>
            </motion.div>
          ))}
        </motion.dl>

        {/* Principles */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 grid gap-10 md:mt-28 md:grid-cols-12 md:gap-10"
        >
          <motion.p variants={fadeUp} className="t-meta md:col-span-3 md:self-start">
            How we hold ourselves
          </motion.p>

          <ol className="border-t border-line md:col-span-8 md:col-start-5">
            {principles.map((p) => (
              <motion.li
                key={p.index}
                variants={fadeUp}
                className="group grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-line py-6 md:grid-cols-[3.5rem_1fr] md:gap-x-6 md:py-7"
              >
                <span className="t-index pt-1 transition-colors duration-500 group-hover:text-accent">
                  {p.index}
                </span>
                <div>
                  <h3 className="display text-[1.3125rem] md:text-[1.625rem]">{p.title}</h3>
                  <p className="t-body-sm mt-2 max-w-[52ch]">{p.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          <motion.div variants={fadeUp} className="md:col-span-3 md:col-start-5">
            <EditorialLink href="#process" size="md">
              How we work
            </EditorialLink>
          </motion.div>
        </motion.div>

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
