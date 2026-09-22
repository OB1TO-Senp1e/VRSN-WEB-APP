import type { ReactNode } from 'react'
import MagneticButton from './MagneticButton'

interface EditorialLinkProps {
  href: string
  children: ReactNode
  /** Visual weight. */
  size?: 'sm' | 'md' | 'lg'
  /** Adds subtle magnetic pull — reserve for primary CTAs. */
  magnetic?: boolean
  className?: string
  cursor?: 'view' | 'talk' | 'arrow'
  onClick?: () => void
  ariaLabel?: string
}

const SIZES = {
  sm: 'text-[0.6875rem] tracking-[0.2em]',
  md: 'text-[0.8125rem] tracking-[0.16em]',
  lg: 'text-[0.9375rem] tracking-[0.12em] md:text-base'
} as const

/**
 * Editorial link-style CTA (spec §19) — an underline and an arrow,
 * never a pill. On hover the rule retracts and the arrow advances.
 */
export default function EditorialLink({
  href,
  children,
  size = 'md',
  magnetic = false,
  className = '',
  cursor,
  onClick,
  ariaLabel
}: EditorialLinkProps) {
  const link = (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor={cursor}
      className={`e-link ${SIZES[size]} ${className}`}
    >
      <span>{children}</span>
      <span className="e-link__arrow" aria-hidden="true">
        →
      </span>
    </a>
  )

  if (!magnetic) return link
  return (
    <MagneticButton strength={0.22} className="inline-block">
      {link}
    </MagneticButton>
  )
}
