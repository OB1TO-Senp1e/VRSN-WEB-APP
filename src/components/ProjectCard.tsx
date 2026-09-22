import { motion } from 'framer-motion'
import type { Project } from '../data/content'
import { fadeUp, imageReveal, staggerContainer, viewportOnce, layoutSpring } from '../lib/motion'
import { useDesktop } from '../hooks/useMedia'

/**
 * Column recipe per composition. This is what breaks the page rhythm —
 * no two consecutive projects share a span, a start column or a
 * vertical offset.
 */
const LAYOUT: Record<
  Project['composition'],
  { wrap: string; metaGrid?: boolean; sizes: string }
> = {
  feature: { wrap: 'md:col-span-8', sizes: '(max-width: 768px) 100vw, 66vw' },
  'offset-right': {
    wrap: 'md:col-span-4 md:col-start-9 md:mt-[20vh]',
    sizes: '(max-width: 768px) 100vw, 33vw'
  },
  full: { wrap: 'md:col-span-12', metaGrid: true, sizes: '100vw' },
  split: { wrap: 'md:col-span-7', sizes: '(max-width: 768px) 100vw, 58vw' },
  'half-right': {
    wrap: 'md:col-span-5 md:col-start-8 md:mt-[16vh]',
    sizes: '(max-width: 768px) 100vw, 42vw'
  },
  'tall-left': { wrap: 'md:col-span-5', sizes: '(max-width: 768px) 100vw, 42vw' },
  'wide-right': {
    wrap: 'md:col-span-7 md:col-start-6 md:-mt-[8vh]',
    sizes: '(max-width: 768px) 100vw, 58vw'
  }
}

/**
 * A project reads as a magazine feature: oversized media, index and
 * discipline set as metadata, and a hover state that moves the type
 * and reveals the summary rather than decorating the frame.
 */
export default function ProjectCard({
  project,
  priority = false
}: {
  project: Project
  priority?: boolean
}) {
  const desktop = useDesktop()
  const layout = LAYOUT[project.composition]

  return (
    <motion.article
      layout
      layoutId={`project-${project.id}`}
      transition={layoutSpring}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      exit={{ opacity: 0, y: 18, transition: { duration: 0.35 } }}
      className={`group ${layout.wrap}`}
    >
      <a
        href="#contact"
        data-cursor={desktop ? 'view' : undefined}
        className="block focus-visible:outline-offset-8"
        aria-label={`${project.title} — ${project.discipline}, ${project.year}. Enquire about this project`}
      >
        {/* Media */}
        <motion.div variants={imageReveal} className={`frame ${project.aspect}`}>
          <img
            src={project.image}
            alt={project.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            sizes={layout.sizes}
            className="transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
          />
          {/* Index — inside the frame, top-left */}
          <span className="t-meta absolute left-4 top-4 text-paper/85 mix-blend-difference md:left-6 md:top-5">
            {project.index}
          </span>
        </motion.div>

        {/* Meta row */}
        <motion.div
          variants={fadeUp}
          className={`mt-6 md:mt-7 ${layout.metaGrid ? 'md:grid md:grid-cols-12 md:gap-10' : ''}`}
        >
          <div className={layout.metaGrid ? 'md:col-span-6' : ''}>
            <h3 className="t-row transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-focus-visible:translate-x-2">
              {project.title}
            </h3>
          </div>

          <div className={layout.metaGrid ? 'md:col-span-5 md:col-start-8' : ''}>
            <div className="mt-4 flex items-baseline justify-between gap-6 border-t border-line pt-3 transition-colors duration-700 group-hover:border-line-strong">
              <p className="t-meta">{project.discipline}</p>
              <p className="t-meta">{project.year}</p>
            </div>

            {/* Summary — reveals on hover (desktop) / always visible on touch */}
            <p
              className={`t-body-sm ${
                desktop
                  ? 'mt-0 max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity,margin] duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:mt-4 group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:mt-4 group-focus-visible:max-h-40 group-focus-visible:opacity-100'
                  : 'mt-4 max-w-[52ch]'
              }`}
            >
              {project.summary}
            </p>
          </div>
        </motion.div>
      </a>
    </motion.article>
  )
}
