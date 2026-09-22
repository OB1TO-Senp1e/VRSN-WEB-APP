import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { lineReveal, wordReveal, viewportOnce } from '../lib/motion'

interface RevealTextProps {
  /** Each entry becomes one masked line. */
  lines: ReactNode[]
  className?: string
  /** Delay applied before the first line, in stagger steps. */
  offset?: number
  /** Drive from scroll (default) or from an external `ready` flag. */
  trigger?: 'view' | boolean
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
}

/**
 * Masked line-by-line typography reveal (spec §03, §05).
 * Each line sits in an overflow-hidden block so the glyphs slide up
 * from behind a hard edge — no fading, no scaling.
 */
export default function RevealText({
  lines,
  className = '',
  offset = 0,
  trigger = 'view',
  as: Tag = 'div'
}: RevealTextProps) {
  const viewProps =
    trigger === 'view'
      ? ({ initial: 'hidden', whileInView: 'visible', viewport: viewportOnce } as const)
      : ({ initial: 'hidden', animate: trigger ? 'visible' : 'hidden' } as const)

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.055em]">
          <motion.span
            className="block will-change-transform"
            variants={lineReveal}
            custom={i + offset}
            {...viewProps}
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
  offset?: number
  trigger?: 'view' | boolean
}

/** Word-level masked reveal for shorter, punchier statements. */
export function RevealWords({ text, className = '', offset = 0, trigger = 'view' }: RevealWordsProps) {
  const words = text.split(' ')
  const viewProps =
    trigger === 'view'
      ? ({ initial: 'hidden', whileInView: 'visible', viewport: viewportOnce } as const)
      : ({ initial: 'hidden', animate: trigger ? 'visible' : 'hidden' } as const)

  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.05em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            variants={wordReveal}
            custom={i + offset}
            {...viewProps}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
