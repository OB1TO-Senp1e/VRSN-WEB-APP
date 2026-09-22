import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import { studio } from '../data/content'

const DURATION = 1250

/**
 * Step 01 of the entrance (spec §03): the ground loads behind a flat
 * curtain, which lifts to hand over to the navigation and headline.
 * Skipped entirely for reduced motion.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (reduced) {
      setVisible(false)
      onDone()
      return
    }
    const t = setTimeout(() => {
      setVisible(false)
      onDone()
    }, DURATION)
    return () => clearTimeout(t)
  }, [reduced, onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[110] bg-ink"
          exit={{ y: '-101%', transition: { duration: 1, ease: EASE } }}
          aria-hidden="true"
        >
          <div className="shell flex h-full flex-col justify-end pb-10">
            <div className="flex items-end justify-between">
              <div className="overflow-hidden">
                <motion.p
                  className="display text-[clamp(2rem,7vw,4rem)] leading-none text-bone"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.95, ease: EASE, delay: 0.05 }}
                >
                  {studio.name}
                  <span className="text-accent">{studio.mark}</span>
                </motion.p>
              </div>
              <motion.p
                className="t-meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {studio.disciplines}
              </motion.p>
            </div>

            {/* Loading rule */}
            <div className="relative mt-7 h-px w-full overflow-hidden bg-[var(--border)]">
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: DURATION / 1000, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
