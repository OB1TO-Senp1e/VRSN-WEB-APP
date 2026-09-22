import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Project } from '../data/content'
import {
  EASE,
  fadeUp,
  imageReveal,
  imageSettle,
  pointerSpring,
  staggerContainer,
  viewportOnce,
  layoutSpring
} from '../lib/motion'
import { useDesktop } from '../hooks/useMedia'

/**
 * Column recipe per composition. This is what breaks the page rhythm —
 * no two consecutive projects share a span, a start column or a
 * vertical offset.
 */
const LAYOUT: Record<Project['composition'], { wrap: string; metaGrid?: boolean; sizes: string }> =
  {
    feature: { wrap: 'md:col-span-8', sizes: '(max-width: 768px) 100vw, 66vw' },
    'offset-right': {
      wrap: 'md:col-span-5 md:col-start-8 md:mt-[16vh]',
      sizes: '(max-width: 768px) 100vw, 40vw'
    },
    full: { wrap: 'md:col-span-12', metaGrid: true, sizes: '100vw' },
    split: { wrap: 'md:col-span-7', sizes: '(max-width: 768px) 100vw, 58vw' },
    'half-right': {
      wrap: 'md:col-span-6 md:col-start-7 md:mt-[14vh]',
      sizes: '(max-width: 768px) 100vw, 50vw'
    },
    'tall-left': { wrap: 'md:col-span-5', sizes: '(max-width: 768px) 100vw, 42vw' },
    'wide-right': {
      wrap: 'md:col-span-7 md:col-start-6 md:-mt-[6vh]',
      sizes: '(max-width: 768px) 100vw, 58vw'
    }
  }

/**
 * A project reads as a magazine feature: oversized media, index and
 * discipline set as metadata, and a hover state that moves the picture
 * and the type rather than decorating the frame.
 *
 * On a fine pointer the image drifts gently against the cursor and the
 * whole composition lifts by a couple of percent — the effect is
 * pointer-tracked, not scroll-linked, so it never fights the page scroll.
 * Touch devices get the same layout with the summary simply visible.
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
  const mediaRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  /* Pointer-tracked media drift — one spring pair per card, only mounted
     while the pointer is actually inside it. */
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, pointerSpring)
  const sy = useSpring(py, pointerSpring)

  const imgX = useTransform(sx, [-1, 1], ['-1.6%', '1.6%'])
  const imgY = useTransform(sy, [-1, 1], ['-1.6%', '1.6%'])

  const onPointerMove = (e: React.PointerEvent) => {
    if (!desktop || !mediaRef.current) return
    const r = mediaRef.current.getBoundingClientRect()
    px.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2))
    py.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2))
  }

  const reset = () => {
    px.set(0)
    py.set(0)
  }

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
        onPointerEnter={desktop ? () => setHovered(true) : undefined}
        onPointerLeave={
          desktop
            ? () => {
                setHovered(false)
                reset()
              }
            : undefined
        }
        onPointerMove={desktop ? onPointerMove : undefined}
        className="block focus-visible:outline-offset-8"
        aria-label={`${project.title} — ${project.discipline}, ${project.year}. Enquire about this project`}
      >
        {/* Media */}
        <motion.div
          ref={mediaRef}
          variants={imageReveal}
          className={`frame ${project.aspect}`}
        >
          <motion.img
            src={project.image}
            alt={project.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            sizes={layout.sizes}
            variants={imageSettle}
            style={desktop ? { x: imgX, y: imgY } : undefined}
            className="transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.055] group-focus-visible:scale-[1.055]"
          />

          {/* Index — inside the frame, top-left */}
          <span className="t-meta absolute left-4 top-4 text-paper/85 mix-blend-difference md:left-6 md:top-5">
            {project.index}
          </span>

          {/* Hover cue — a small editorial flag, bottom-right. It is the
              same object on every card, so it reads as a system. */}
          <motion.span
            aria-hidden="true"
            className="t-meta absolute bottom-4 right-4 hidden items-center gap-2 bg-ink px-3 py-2 text-paper md:inline-flex"
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 10
            }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            View
            <span className="text-accent">→</span>
          </motion.span>
        </motion.div>

        {/* Meta row */}
        <motion.div
          variants={fadeUp}
          className={`mt-5 md:mt-6 ${layout.metaGrid ? 'md:grid md:grid-cols-12 md:gap-10' : ''}`}
        >
          <div className={layout.metaGrid ? 'md:col-span-6' : ''}>
            <h3 className="t-row flex items-baseline gap-3 transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-focus-visible:translate-x-2">
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
