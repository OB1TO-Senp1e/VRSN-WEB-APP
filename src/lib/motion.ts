import type { Variants, Transition } from 'framer-motion'

/** Shared expo-like ease used across the site. */
export const EASE: Transition['ease'] = [0.16, 1, 0.3, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.08 }
  })
}

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 1, ease: EASE, delay: i * 0.08 }
  })
}

/** Line-mask reveal for display headlines — wrap each line in an overflow-hidden span. */
export const lineReveal: Variants = {
  hidden: { y: '110%' },
  visible: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 1, ease: EASE, delay: 0.08 + i * 0.1 }
  })
}

/** Clip-path image reveal. */
export const imageReveal: Variants = {
  hidden: { clipPath: 'inset(12% 6% 12% 6% round 12px)', opacity: 0 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0% round 12px)',
    opacity: 1,
    transition: { duration: 1.2, ease: EASE }
  }
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
}

export const viewportOnce = { once: true, margin: '-12% 0px' } as const
