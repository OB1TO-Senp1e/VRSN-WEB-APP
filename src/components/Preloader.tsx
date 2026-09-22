import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'
import { studio } from '../data/content'

const DURATION = 1150

/**
 * Step 01 of the entrance: an ink curtain with the wordmark and a
 * loading rule, which lifts to hand over to navigation and headline.
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
          className="chapter-ink fixed inset-0 z-[110]"
          exit={{ y: '-101%', transition: { duration: 0.95, ease: EASE } }}
          aria-hidden="true"
        >
          <div className="shell flex h-full flex-col justify-between py-8">
            <div className="flex items-baseline justify-between">
              <motion.p
                className="t-meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                {studio.positioning}
              </motion.p>
              <motion.p
                className="t-meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                {studio.disciplines}
              </motion.p>
            </div>

            <div>
              <div className="overflow-hidden">
                <motion.p
                  className="display text-[clamp(3rem,12vw,9rem)] uppercase leading-[0.85] text-paper"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.95, ease: EASE, delay: 0.05 }}
                >
                  {studio.name}
                  <span className="text-[0.4em] font-medium align-top">{studio.mark}</span>
                </motion.p>
              </div>

              {/* Loading rule */}
              <div className="relative mt-6 h-px w-full overflow-hidden bg-line">
                <motion.div
                  className="absolute inset-y-0 left-0 w-full origin-left bg-paper"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: DURATION / 1000, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
