import type { PropsWithChildren } from 'react'

type CardProps = PropsWithChildren<{
  className?: string
  hover?: boolean
}>

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/70 bg-surface/90 p-6 shadow-soft ring-1 ring-primary/5 backdrop-blur ${
        hover
          ? 'transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_28px_80px_rgb(15_23_42_/_0.14)]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
