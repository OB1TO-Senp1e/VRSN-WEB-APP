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
 * Implementation note: the transform is declared as an explicit
 * `initial` / `whileInView` object pair rather than a `variants` function
 * variant. A percentage `y` target inside a function variant does not
 * resolve its unit in Motion 13, which leaves the element parked at its
 * hidden offset — visibly blank. The object form resolves correctly and
 * is what the hero uses, so both share one code path.
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
        <span key={i} className="block overflow-hidden pb-[0.055em] pr-[0.02em]">
          <motion.span
            className="block will-change-transform"
            initial={reduced ? false : { y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={viewportOnce}
            transition={{ duration, ease: EASE, delay: reduced ? 0 : i * stagger }}
          >
            {line}
          </motion.span>
        </span>
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
 * Same technique as `RevealText`, one word per mask.
 */
export function RevealWords({ text, className = '', stagger = 0.05 }: RevealWordsProps) {
  const words = text.split(' ')
  const reduced = usePrefersReducedMotion()

  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.05em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={reduced ? false : { y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={viewportOnce}
            transition={{ duration: 1.05, ease: EASE, delay: reduced ? 0 : i * stagger }}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
