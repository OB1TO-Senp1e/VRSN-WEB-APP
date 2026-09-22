import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

interface SectionHeadingProps {
  number: string
  label: string
  title: string
  align?: 'left' | 'right'
}

/** Numbered eyebrow + oversized section title with reveal animation. */
export default function SectionHeading({ number, label, title, align = 'left' }: SectionHeadingProps) {
  return (
    <motion.header
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={align === 'right' ? 'text-right' : ''}
    >
      <motion.p variants={fadeUp} className="eyebrow flex items-baseline gap-4">
        <span className="text-accent">{number}</span>
        <span className="h-px w-10 self-center bg-[rgba(242,239,233,0.22)]" aria-hidden="true" />
        {label}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="display mt-6 text-[clamp(2.4rem,6vw,5rem)] text-bone"
      >
        {title}
      </motion.h2>
    </motion.header>
  )
}
