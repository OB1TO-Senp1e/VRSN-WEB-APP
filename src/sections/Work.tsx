import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { projects, filters, archive } from '../data/content'
import { fadeUp, viewportOnce } from '../lib/motion'
import RevealText from '../components/RevealText'
import ProjectCard from '../components/ProjectCard'
import ProjectFilter from '../components/ProjectFilter'
import ArchiveOverlay from '../components/ArchiveOverlay'

/**
 * The visual centrepiece, set on ink so the photography carries.
 * Projects sit on a 12-column editorial grid with varying spans,
 * start columns and vertical offsets, so no two features share a rhythm.
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
      active === 'all' ? projects : projects.filter((p) => p.categories.includes(active)),
    [active]
  )

  return (
    <section
      id="work"
      data-theme="ink"
      className="chapter-ink section relative"
      aria-label="Selected work"
    >
      <div className="shell">
        {/* Header */}
        <div className="grid gap-9 md:grid-cols-12 md:items-end md:gap-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="sec-label md:col-span-3 md:self-start"
          >
            <span className="n">( 03 )</span>
            <span>Selected work</span>
          </motion.p>

          <div className="md:col-span-9">
            <RevealText
              as="h2"
              className="t-display"
              lines={[
                'SELECTED',
                <>
                  <span className="em">Work</span>
                  <span className="t-meta ml-4 inline-block align-top !text-muted md:ml-6">
                    {String(projects.length).padStart(2, '0')} — {new Date().getFullYear()}
                  </span>
                </>
              ]}
            />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="t-body mt-8 max-w-[38ch] md:mt-10"
            >
              Identities, platforms and experiments — each one built end to end,
              in-house, by the people who designed it.
            </motion.p>
          </div>
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
            className="mt-14 grid grid-cols-1 gap-x-10 gap-y-20 md:mt-24 md:grid-cols-12 md:gap-y-28 lg:gap-y-36"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p, i) => (
                <ProjectCard key={p.id} project={p} priority={i < 1} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {visible.length === 0 && (
          <p className="t-body mt-20">Nothing filed under that discipline yet.</p>
        )}

        {/* Archive entry */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-24 flex flex-wrap items-baseline justify-between gap-6 border-t border-line pt-8 md:mt-36"
        >
          <p className="t-meta">
            Complete index — {projects.length + archive.length} projects
          </p>
          <button type="button" onClick={() => setArchiveOpen(true)} className="e-link">
            <span>See all work</span>
            <span className="e-link__arrow" aria-hidden="true">→</span>
          </button>
        </motion.div>
      </div>

      <ArchiveOverlay open={archiveOpen} onClose={() => setArchiveOpen(false)} />
    </section>
  )
}
