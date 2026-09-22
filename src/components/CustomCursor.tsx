import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer, usePrefersReducedMotion } from '../hooks/useMedia'

type CursorState = 'default' | 'view' | 'link' | 'hidden'

/**
 * Custom cursor: small dot that expands to a "VIEW" badge over projects
 * and grows subtly over interactive elements. Fine pointers only.
 */
export default function CustomCursor() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const [state, setState] = useState<CursorState>('hidden')
  const stateRef = useRef(state)
  stateRef.current = state

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 })

  useEffect(() => {
    if (!fine || reduced) {
      document.body.classList.remove('vrsn-cursor')
      return
    }
    document.body.classList.add('vrsn-cursor')

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (stateRef.current === 'hidden') setState('default')
      const t = e.target as HTMLElement
      if (t.closest('[data-cursor="view"]')) setState('view')
      else if (t.closest('a, button, [data-cursor="link"]')) setState('link')
      else setState('default')
    }
    const onLeave = () => setState('hidden')

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.body.classList.remove('vrsn-cursor')
    }
  }, [fine, reduced, x, y])

  if (!fine || reduced) return null

  const size = state === 'view' ? 76 : state === 'link' ? 40 : 10

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[100] pointer-events-none flex items-center justify-center rounded-full mix-blend-difference bg-[#f2efe9]"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: size,
        height: size,
        opacity: state === 'hidden' ? 0 : 1
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <motion.span
        className="text-[10px] font-semibold tracking-[0.2em] text-[#0a0a0b] select-none"
        animate={{ opacity: state === 'view' ? 1 : 0, scale: state === 'view' ? 1 : 0.5 }}
        transition={{ duration: 0.25 }}
      >
        VIEW
      </motion.span>
    </motion.div>
  )
}
