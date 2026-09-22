import type { Variants, Transition } from 'framer-motion'

/**
 * Motion language — slow, smooth, confident, intentional.
 * Only opacity / transform / clip-path. No bounce, no spin, no float.
 *
 * The rule for the whole site: motion explains hierarchy — what matters
 * arrives first, what supports it follows. Nothing moves for decoration.
 */

/** Expo-out — the studio's signature curve. */
export const EASE: Transition['ease'] = [0.16, 1, 0.3, 1]
/** Softer in-out, for reversible states. */
export const EASE_IO: Transition['ease'] = [0.65, 0, 0.35, 1]
/** Quart-out — used for pointer-tracked transforms where expo feels late. */
export const EASE_QUART: Transition['ease'] = [0.22, 1, 0.36, 1]

export const DUR = {
  fast: 0.4,
  base: 0.8,
  slow: 1.1,
  reveal: 1.25
} as const

export const viewportOnce = { once: true, margin: '-10% 0px -10% 0px' } as const
export const viewportEarly = { once: true, margin: '0px 0px -8% 0px' } as const

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: DUR.slow, ease: EASE, delay: i * 0.07 }
  })
}

/** Restrained upward fade — 20px, never more. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE, delay: i * 0.07 }
  })
}

/** Masked line reveal — wrap in an overflow-hidden parent. */
export const lineReveal: Variants = {
  hidden: { y: '110%' },
  visible: (i: number = 0) => ({
    y: '0%',
    transition: { duration: DUR.reveal, ease: EASE, delay: i * 0.1 }
  })
}

export const wordReveal: Variants = {
  hidden: { y: '110%' },
  visible: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 1.05, ease: EASE, delay: i * 0.05 }
  })
}

/** Clip-path image reveal, paired with a 1.08 → 1 settle on the img. */
export const imageReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: DUR.reveal, ease: EASE }
  }
}
export const imageSettle: Variants = {
  hidden: { scale: 1.08 },
  visible: { scale: 1, transition: { duration: DUR.reveal * 1.15, ease: EASE } }
}

export const ruleReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: (i: number = 0) => ({
    scaleX: 1,
    transition: { duration: DUR.slow, ease: EASE, delay: i * 0.06 }
  })
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } }
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } }
}

/** Layout spring for filter rearrangement. */
export const layoutSpring: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
  mass: 0.9
}

/** Hover spring for media / text nudges. */
export const hoverSpring: Transition = {
  type: 'spring',
  stiffness: 170,
  damping: 26,
  mass: 0.6
}

/** Pointer-tracked media spring — soft enough to trail the cursor. */
export const pointerSpring: Transition = {
  type: 'spring',
  stiffness: 150,
  damping: 24,
  mass: 0.5
}

/**
 * Shared "reveal on scroll into view" prop bundle.
 * Every section animates on the same contract, so the page reads as one
 * system rather than a set of independently animated blocks.
 */
export const inViewOnce = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: viewportOnce
} as const

/**
 * Pointer-tracking helper. Given a motion value pair and a pointer event
 * on the element itself, returns normalised offsets from centre in the
 * range [-1, 1] — the basis of every "image moves with the cursor" effect
 * on the site, so they all share one feel.
 */
export function centreOffset(
  e: { clientX: number; clientY: number },
  rect: DOMRect
): { nx: number; ny: number } {
  const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
  const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
  return { nx: Math.max(-1.5, Math.min(1.5, nx)), ny: Math.max(-1.5, Math.min(1.5, ny)) }
}
