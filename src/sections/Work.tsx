import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { projects, filters, archive } from '../data/content'
import { fadeUp, ruleReveal, viewportOnce } from '../lib/motion'
import RevealText from '../components/RevealText'
import ProjectCard from '../components/ProjectCard'
import ProjectFilter from '../components/ProjectFilter'
import ArchiveOverlay from '../components/ArchiveOverlay'

/**
 * The visual centrepiece (spec §06). Projects sit on a 12-column
 * editorial grid with varying spans, aspect ratios and alignment, so
 * no two features share a rhythm.
 */
export default function Work() {
  const [active, setActive] = useState('all')
  const [archiveOpen, setArchiveOpen] = useState(false)

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length }
    filters.forEach((f) => {
      if (f.key === 'all') return
      c[f.key] = projects.filter((p) => p.categories.includes(f.key)).length
    })
    return c
  }, [])

  const visible = useMemo(
    () =>
      active === 'all'
        ? projects
        : projects.filter((p) => p.categories.includes(active)),
    [active]
  )

  return (
    <section id="work" className="relative py-24 md:py-32 lg:py-40" aria-label="Selected work">
      <div className="shell">
        {/* Header */}
        <div className="grid gap-9 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="eyebrow mb-7 md:mb-10"
            >
              <span className="text-accent">02</span>
              <span className="px-3 text-[var(--muted-2)]">/</span>
              Work
            </motion.p>
            <RevealText
              as="h2"
              className="t-display text-bone"
              lines={['SELECTED', 'WORK']}
            />
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="t-body max-w-[34ch] md:col-span-4 md:col-start-9 md:!text-[1.0625rem]"
          >
            Identities, platforms and experiments from a decade of practice.
            Each one built end to end, in-house.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="mt-14 md:mt-20">
          <ProjectFilter active={active} onChange={setActive} counts={counts} />
        </div>

        {/* Editorial grid */}
        <LayoutGroup>
          <motion.div
            id="work-grid"
            layout
            className="mt-14 grid grid-cols-1 gap-x-10 gap-y-20 md:mt-24 md:grid-cols-12 md:gap-y-32 lg:gap-y-40"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p, i) => (
                <ProjectCard key={p.id} project={p} priority={i < 2} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty state */}
        {visible.length === 0 && (
          <p className="mt-20 t-body">Nothing filed under that discipline yet.</p>
        )}

        {/* Archive entry */}
        <motion.div
          variants={ruleReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-24 h-px origin-left bg-[var(--border)] md:mt-36"
          aria-hidden="true"
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 flex flex-wrap items-baseline justify-between gap-6"
        >
          <p className="t-meta">
            Complete index — {projects.length + archive.length} projects
          </p>
          <button
            type="button"
            onClick={() => setArchiveOpen(true)}
            className="e-link text-[0.8125rem] tracking-[0.16em]"
          >
            <span>See all work</span>
            <span className="e-link__arrow" aria-hidden="true">
              →
            </span>
          </button>
        </motion.div>
      </div>

      <ArchiveOverlay open={archiveOpen} onClose={() => setArchiveOpen(false)} />
    </section>
  )
}
