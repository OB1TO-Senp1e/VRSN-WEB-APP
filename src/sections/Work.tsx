import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { projects, archive, type Project } from '../data/content'
import { imageReveal, fadeUp, staggerContainer, viewportOnce, EASE } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import SectionHeading from '../components/SectionHeading'

/** Single editorial project entry with parallax, clip reveal and hover overlay. */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [30, -30])

  return (
    <motion.article
      ref={ref}
      className={`group ${project.span}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      style={{ y }}
    >
      <a
        href="#contact"
        data-cursor="view"
        className="block focus-visible:outline-2"
        aria-label={`${project.title} — ${project.category}, ${project.year}`}
      >
        <motion.div variants={imageReveal} className={`img-frame relative ${project.aspect}`}>
          <img
            src={project.image}
            alt={project.alt}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            className="group-hover:scale-[1.045] group-hover:brightness-90"
          />
          {/* Hover overlay */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/20 to-transparent p-6 opacity-0 transition-opacity duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 md:p-8">
            <p className="translate-y-4 text-sm leading-relaxed text-bone-dim transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 md:max-w-md">
              {project.description}
            </p>
          </div>
          {/* Tag chip */}
          <span className="absolute left-5 top-5 rounded-full border border-[rgba(242,239,233,0.18)] bg-[rgba(10,10,11,0.5)] px-3 py-1 text-[10px] font-medium tracking-[0.18em] text-bone backdrop-blur-md">
            {project.tag.toUpperCase()}
          </span>
        </motion.div>

        {/* Meta row */}
        <motion.div variants={fadeUp} className="mt-5 flex items-baseline justify-between gap-4 border-b border-[rgba(242,239,233,0.1)] pb-5">
          <div className="flex items-baseline gap-4 min-w-0">
            <h3 className="display truncate text-2xl text-bone transition-colors duration-500 group-hover:text-accent md:text-3xl">
              {project.title}
            </h3>
            <span className="hidden text-xs tracking-[0.15em] text-bone-faint sm:inline">
              {project.category.toUpperCase()}
            </span>
          </div>
          <span className="shrink-0 font-mono text-xs text-bone-faint">{project.year}</span>
        </motion.div>
      </a>
    </motion.article>
  )
}

/** Full-screen archive overlay triggered by "View all work". */
function ArchiveOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const all = [
    ...projects.map((p) => ({ title: p.title, category: p.category, year: p.year })),
    ...archive
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Complete project archive"
          className="fixed inset-0 z-[95] overflow-y-auto bg-ink/97 px-6 py-24 backdrop-blur-2xl md:px-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="eyebrow mb-3">Complete index</p>
                <h3 className="display text-4xl text-bone md:text-6xl">Archive</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close archive"
                className="grid size-12 place-items-center rounded-full border border-[rgba(242,239,233,0.2)] text-bone transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <ul>
              {all.map((e, i) => (
                <motion.li
                  key={`${e.title}-${e.year}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.04 }}
                  className="group flex items-baseline justify-between gap-4 border-b border-[rgba(242,239,233,0.08)] py-5 transition-colors duration-300 hover:border-[rgba(201,168,118,0.4)]"
                >
                  <span className="display text-xl text-bone transition-colors duration-300 group-hover:text-accent md:text-2xl">
                    {e.title}
                  </span>
                  <span className="hidden flex-1 border-b border-dotted border-[rgba(242,239,233,0.12)] sm:block" aria-hidden="true" />
                  <span className="text-xs tracking-[0.15em] text-bone-faint">{e.category.toUpperCase()}</span>
                  <span className="font-mono text-xs text-bone-faint">{e.year}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Work() {
  const [archiveOpen, setArchiveOpen] = useState(false)

  return (
    <section id="work" className="relative px-6 py-28 md:px-10 md:py-40" aria-label="Selected work">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
          <SectionHeading number="01" label="Selected work" title="Work that ships." />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-xs text-sm leading-relaxed text-bone-faint"
          >
            A selection of identities, platforms and experiments from the last decade of practice.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-12 md:gap-y-24">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 flex justify-center"
        >
          <button
            type="button"
            onClick={() => setArchiveOpen(true)}
            className="group inline-flex items-center gap-3 rounded-full border border-[rgba(242,239,233,0.22)] px-8 py-4 text-sm font-medium text-bone transition-colors duration-500 hover:border-accent hover:text-accent"
          >
            View all work
            <span className="font-mono text-xs text-bone-faint transition-colors duration-500 group-hover:text-accent">
              ({projects.length + archive.length})
            </span>
            <ArrowUpRight className="size-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </motion.div>
      </div>

      <ArchiveOverlay open={archiveOpen} onClose={() => setArchiveOpen(false)} />
    </section>
  )
}
