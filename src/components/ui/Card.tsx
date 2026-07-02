import type { PropsWithChildren } from 'react'

type CardProps = PropsWithChildren<{
  className?: string
}>

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface p-6 shadow-soft ${className}`}
    >
      {children}
    </div>
  )
}
