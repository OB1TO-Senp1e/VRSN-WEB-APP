import { motion } from 'framer-motion'
import type { Project } from '../data/content'
import { fadeUp, imageReveal, staggerContainer, viewportOnce, layoutSpring } from '../lib/motion'
import { useFinePointer } from '../hooks/useMedia'

/** Column recipe per composition — this is what breaks the page rhythm. */
const LAYOUT: Record<
  Project['composition'],
  { wrap: string; media: string; meta: string }
> = {
  left: {
    wrap: 'md:col-span-7',
    media: '',
    meta: ''
  },
  right: {
    wrap: 'md:col-span-6 md:col-start-7',
    media: '',
    meta: ''
  },
  'tall-left': {
    wrap: 'md:col-span-5',
    media: '',
    meta: ''
  },
  'tall-right': {
    wrap: 'md:col-span-5 md:col-start-8',
    media: '',
    meta: ''
  },
  full: {
    wrap: 'md:col-span-12',
    media: '',
    meta: 'md:grid md:grid-cols-12 md:items-baseline'
  }
}

/**
 * A project reads as a magazine feature (spec §06, §07): oversized
 * media, index and discipline set as metadata, and a hover state that
 * moves the type rather than decorating the frame.
 */
export default function ProjectCard({
  project,
  priority = false
}: {
  project: Project
  priority?: boolean
}) {
  const fine = useFinePointer()
  const layout = LAYOUT[project.composition]
  const isFull = project.composition === 'full'

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
        data-cursor="view"
        className="block"
        aria-label={`${project.title} — ${project.discipline}, ${project.year}`}
      >
        {/* Media */}
        <motion.div variants={imageReveal} className={`frame ${project.aspect} ${layout.media}`}>
          <img
            src={project.image}
            alt={project.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            sizes={isFull ? '100vw' : '(max-width: 768px) 100vw, 55vw'}
            className="transition-[transform,filter] duration-[1200ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
          />

          {/* Award note — typographic, top-aligned, no chip */}
          {project.award && (
            <span className="absolute left-4 top-4 t-meta !text-bone/85 mix-blend-difference md:left-6 md:top-6">
              [ {project.award} ]
            </span>
          )}
        </motion.div>

        {/* Meta row */}
        <motion.div
          variants={fadeUp}
          className={`mt-5 border-t border-[var(--border)] pt-4 transition-colors duration-700 group-hover:border-[var(--border-strong)] md:mt-6 md:pt-5 ${layout.meta}`}
        >
          <div className={`flex items-baseline gap-4 ${isFull ? 'md:col-span-6' : ''}`}>
            <span className="t-index shrink-0 text-bone-faint transition-colors duration-500 group-hover:text-accent">
              {project.index}
            </span>
            <h3 className="t-row text-bone transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 md:group-hover:translate-x-2.5">
              {project.title}
            </h3>
          </div>

          <div
            className={`mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 md:mt-4 ${
              isFull ? 'md:col-span-5 md:col-start-8 md:mt-0' : ''
            }`}
          >
            <p className="t-meta transition-colors duration-500 group-hover:text-bone-dim">
              {project.discipline}
            </p>
            <p className="t-meta tabular-nums">{project.year}</p>
          </div>

          {/* Summary — revealed on hover (desktop) / always visible (touch) */}
          <p
            className={`overflow-hidden text-[0.9375rem] leading-relaxed text-bone-dim ${
              isFull ? 'md:col-span-5 md:col-start-8' : ''
            } ${
              fine
                ? 'max-h-0 opacity-0 transition-[max-height,opacity,margin] duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:mt-3 group-hover:max-h-32 group-hover:opacity-100 group-focus-within:mt-3 group-focus-within:max-h-32 group-focus-within:opacity-100'
                : 'mt-3 max-w-[48ch]'
            }`}
          >
            {project.summary}
          </p>
        </motion.div>
      </a>
    </motion.article>
  )
}
