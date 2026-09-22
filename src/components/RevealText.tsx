import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE, viewportOnce } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'

interface RevealTextProps {
  /** Each entry becomes one masked line. */
  lines: ReactNode[]
  className?: string
  /** Steps of stagger applied before each line begins. */
  stagger?: number
  /** Per-line travel duration, in seconds. */
  duration?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
}

/**
 * Masked line-by-line typography reveal.
 *
 * Each line sits in an overflow-hidden block so the glyphs slide up from
 * behind a hard edge — no fading, no scaling. This is the single entrance
 * used by every headline-scale block on the page, which is why the page
 * feels like one system rather than a set of separately animated parts.
 *
 * IMPORTANT — where the observer goes.
 * The inner span starts fully translated behind its mask, so it is
 * completely clipped. IntersectionObserver computes intersection AFTER
 * ancestor clipping, so a fully-clipped element reports zero intersection
 * and `whileInView` never fires — the line stays parked at its hidden
 * offset and the headline reads as blank space.
 *
 * The fix is to put `initial` / `whileInView` on the MASK element (which
 * is never clipped and always has its full line height) and let the inner
 * span inherit the state through `variants`. The observer then measures a
 * real box. Hero, which is driven by a boolean flag rather than an
 * observer, never had this problem — but both now share one code path.
 *
 * Under `prefers-reduced-motion` the lines simply sit at rest.
 */
export default function RevealText({
  lines,
  className = '',
  stagger = 0.075,
  duration = 1.15,
  as: Tag = 'div'
}: RevealTextProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden pb-[0.055em] pr-[0.02em]"
          variants={{ hidden: {}, visible: {} }}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={viewportOnce}
        >
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: '110%' },
              visible: {
                y: '0%',
                transition: { duration, ease: EASE, delay: reduced ? 0 : i * stagger }
              }
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  )
}

interface RevealWordsProps {
  text: string
  className?: string
  stagger?: number
}

/**
 * Word-level masked reveal for shorter, punchier statements.
 * Same technique as `RevealText` — observer on the mask, travel on the child.
 */
export function RevealWords({ text, className = '', stagger = 0.05 }: RevealWordsProps) {
  const words = text.split(' ')
  const reduced = usePrefersReducedMotion()

  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block overflow-hidden pb-[0.05em] align-bottom"
          variants={{ hidden: {}, visible: {} }}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={viewportOnce}
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: '110%' },
              visible: {
                y: '0%',
                transition: { duration: 1.05, ease: EASE, delay: reduced ? 0 : i * stagger }
              }
            }}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </motion.span>
      ))}
    </span>
  )
}
