import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { imageReveal, viewportOnce } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'

interface ImageRevealProps {
  src: string
  alt: string
  /** aspect-ratio utility, e.g. "aspect-[4/5]" */
  aspect?: string
  className?: string
  /** Extra classes for the <img> itself. */
  imgClassName?: string
  /** Vertical parallax travel in percent of the image's own height. */
  parallax?: number
  priority?: boolean
  sizes?: string
  /** Drive the curtain from scroll (default) or from an external flag. */
  trigger?: 'view' | boolean
}

/**
 * Clip-path curtain reveal + gentle vertical parallax (spec §20).
 * The image is over-scaled so parallax never exposes an edge.
 *
 * One primitive serves every photograph on the site, so the entrance is
 * identical whether the image is in the hero, the studio chapter or the
 * project grid — that repetition is what makes the page feel authored.
 */
export default function ImageReveal({
  src,
  alt,
  aspect = 'aspect-[4/5]',
  className = '',
  imgClassName = '',
  parallax = 6,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 60vw',
  trigger = 'view'
}: ImageRevealProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced || parallax === 0 ? ['0%', '0%'] : [`${-parallax}%`, `${parallax}%`]
  )

  const overscan = reduced || parallax === 0 ? 100 : 100 + parallax * 2.4

  const triggerProps =
    trigger === 'view'
      ? ({ initial: 'hidden', whileInView: 'visible', viewport: viewportOnce } as const)
      : ({ initial: 'hidden', animate: trigger ? 'visible' : 'hidden' } as const)

  return (
    <motion.div
      ref={ref}
      className={`frame ${aspect} ${className}`}
      variants={imageReveal}
      {...triggerProps}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        style={{ y, height: `${overscan}%`, position: 'absolute', inset: 0, margin: 'auto' }}
        className={`w-full object-cover ${imgClassName}`}
      />
    </motion.div>
  )
}
