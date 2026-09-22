import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Magnetic from './Magnetic'

interface ButtonProps {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost'
  arrow?: 'right' | 'up'
  className?: string
}

/** Primary/secondary CTA with animated arrow + magnetic pull. */
export default function Button({ href, children, variant = 'solid', arrow = 'right', className = '' }: ButtonProps) {
  const Icon = arrow === 'up' ? ArrowUpRight : ArrowRight
  const base =
    'group relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-500 overflow-hidden'
  const styles =
    variant === 'solid'
      ? 'bg-bone text-ink hover:bg-accent'
      : 'border border-[rgba(242,239,233,0.22)] text-bone hover:border-accent hover:text-accent'

  return (
    <Magnetic strength={0.2} className={`inline-block ${className}`}>
      <a href={href} className={`${base} ${styles}`}>
        <span className="relative z-10">{children}</span>
        <span className="relative z-10 grid size-4 place-items-center overflow-hidden">
          <Icon
            className="size-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[150%] group-hover:opacity-0"
            aria-hidden="true"
          />
          <Icon
            className="absolute size-4 -translate-x-[150%] opacity-0 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden="true"
          />
        </span>
      </a>
    </Magnetic>
  )
}
