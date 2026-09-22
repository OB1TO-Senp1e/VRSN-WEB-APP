import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/useMedia'

/** Brief cinematic curtain on first load. Skipped for reduced motion. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(!reduced)

  useEffect(() => {
    if (reduced) {
      onDone()
      return
    }
    const t = setTimeout(() => {
      setVisible(false)
      onDone()
    }, 1500)
    return () => clearTimeout(t)
  }, [reduced, onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[110] grid place-items-center bg-ink"
          exit={{ y: '-100%', transition: { duration: 0.9, ease: EASE } }}
          aria-hidden="true"
        >
          <div className="overflow-hidden">
            <motion.p
              className="display text-[clamp(2.5rem,8vw,6rem)] text-bone"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            >
              VRSN<span className="text-accent">®</span>
            </motion.p>
          </div>
          <motion.div
            className="absolute bottom-10 left-1/2 h-px w-40 -translate-x-1/2 bg-[rgba(242,239,233,0.15)] overflow-hidden"
          >
            <motion.div
              className="h-full bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
